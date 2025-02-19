import { useEffect, useState, useCallback } from "react"
import type { Member, MemberCardProps } from "../../types/Member_Timeline"
import { UseAPI } from "@/apis/useAPI"
import { API } from "@/apis/API"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function MemberList() {
  const [loading, setLoading] = useState(true)
  const [groupedMembers, setGroupedMembers] = useState<Record<string, Member[]>>({})

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await UseAPI({
        url: API.squad,
        method: "GET",
      })
      const members: Member[] = res.data.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        imageUrl: item.imageUrl,
        date: item.startDate,
        position: item.position,
      }))

      // 🔥 จัดกลุ่มตามวันที่ + เรียงลำดับ
      const grouped = members
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reduce((acc: Record<string, Member[]>, member) => {
          const dateLabel = new Date(member.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          if (!acc[dateLabel]) acc[dateLabel] = []
          acc[dateLabel].push(member)
          return acc
        }, {})


      setGroupedMembers(grouped)
    } catch (error) {
      console.error("Error fetching teams:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 font-Montserrat">
        <div className="relative space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-[400px] w-[300px] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  console.log('groupedMembers', groupedMembers)

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 mt-10 font-Montserrat">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-24 md:space-y-32">
          {Object.entries(groupedMembers).map(([dateLabel, members], index) => (
            <motion.div
              key={dateLabel}
              className="relative flex flex-col lg:flex-row lg:items-start lg:space-x-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            >
              {/* 🔶 เส้น Timeline สำหรับจอใหญ่ */}
              <div className="absolute left-6 sm:left-8 top-[2rem] bottom-0 w-[1px] bg-[#CCCFE5] z-0 hidden lg:block"></div>

              {/* 🔶 ชื่อวันที่วางตรงกลางและปรับให้ใหญ่ขึ้น */}
              <div className="text-center mx-auto mb-4 lg:absolute lg:left-[0.5rem] lg:transform lg:-translate-x-[50%] lg:-translate-y-1/2 lg:top-0 lg:text-left z-10">
                <span className="text-xl sm:text-lg md:text-base lg:text-sm font-semibold text-[#F86F03] block">
                  {dateLabel}
                </span>
              </div>

              {/* 🔄 แสดง Card ของ Member */}
              <div className="flex-1 pt-8 pl-6 sm:pl-8 lg:pl-48">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {members.map((member, idx) => (
                    <MemberCard
                      key={member.id}
                      name={member.name}
                      imageUrl={member.imageUrl || ""}
                      date={member.date}
                      index={idx} id={member.id}
                      position={member.position} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function MemberCard({
  name,
  imageUrl,
  index,
  position,
}: MemberCardProps & { index: number, date: string }) {
  return (
    <motion.div
      className="relative w-full max-w-[280px] md:max-w-[300px] mx-auto pb-8 lg:pb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <motion.div
        className="bg-white rounded-xl w-full shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden transform-gpu relative"
        whileHover={{
          y: -5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {/* 🔥 ปรับวันที่เป็น fixed */}
        {/* <span className="fixed top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm block sm:hidden z-10 opacity-50">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span> */}

        <div className="relative overflow-hidden" style={{ height: "400px" }}>
          <motion.img
            src={imageUrl || "https://via.placeholder.com/300x400?text=No+Image"}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 transform-gpu"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* 🔥 Overlay Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        <motion.div
          className="bg-[#F5F5F8] p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
        >
          <p className="font-semibold text-center text-gray-700 text-lg mb-1">{name}</p>
          <p className="text-center text-[#D0D0D0] text-base">
            {position}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}



