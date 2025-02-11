import { useEffect, useState } from "react"
import type { Member, MemberCardProps } from "../../types/Member_Timeline"
import { UseAPI } from "@/apis/useAPI"
import { API } from "@/apis/API"
import { useTimelineContext } from "@/contexts/TimelineContext"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function MemberList() {
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<Member[]>([])
  const { setYears, selectedYear, setSelectedYear } = useTimelineContext()

  useEffect(() => {
    fetchMembers()
  }, [])

  async function fetchMembers() {
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
      }))

      setMembers(members)

      const uniqueYears = Array.from(new Set(members.map((item) => new Date(item.date).getFullYear().toString())))

      setYears(uniqueYears)

      if (uniqueYears.length > 0 && !selectedYear) {
        setSelectedYear(uniqueYears[0])
      }
    } catch (error) {
      console.error("Error fetching teams:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 font-Montserrat">
        <div className="relative md:pl-48 space-y-12">
          {" "}
          {/* Increased left padding significantly */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <Skeleton className="h-2 w-2 rounded-full absolute -left-40 top-2 hidden md:block" />{" "}
              {/* Adjusted position */}
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-[400px] w-[300px] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 font-Montserrat">
      <motion.div
        className="relative md:pl-48" // Increased left padding significantly
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

        {/* Member cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {members
            .filter((member) => new Date(member.date).getFullYear().toString() === selectedYear)
            .map((member, index, array) => (
              <MemberCard
                key={member.id}
                name={member.name}
                imageUrl={member.imageUrl || ""}
                date={member.date}
                isLast={index === array.length - 1}
                id={member.id}
                index={index}
                number={index + 10} // Example number for timeline
              />
            ))}
        </div>
      </motion.div>
    </div>
  )
}

function MemberCard({
  name,
  imageUrl,
  date,
  index = 0,
}: MemberCardProps & { index: number; number: number }) {
  return (
    <motion.div
      className="relative pb-16" // Removed default left padding
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline number and connector - only visible on md and up */}
      {/* <div className="absolute left-[-88px] top-2 hidden md:flex items-center">
        <div className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">{number}</div>
        <div className="h-px w-6 border-t-2 border-dashed border-gray-300" />
      </div> */}

      {/* Date */}
      <motion.span
        className="font-semibold text-sm text-[#D87D2B] mb-6 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </motion.span>

      {/* Card */}
      <motion.div
        className="bg-white rounded-xl w-[300px] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        whileHover={{
          y: -5,
          transition: { duration: 0.2 },
        }}
      >
        <div className="relative overflow-hidden" style={{ height: "400px" }}>
          <motion.img
            src={
              imageUrl ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202568-02-05%20at%2012.20.11-qhrlHjjgMwkYdTneMb9onfwFozd8WR.png"
            }
            alt={name}
            className="object-cover w-full h-full"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <motion.div
          className="bg-[#F5F5F8] p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        >
          <p className="font-semibold text-center text-gray-700 text-lg mb-1">{name}</p>
          <p className="text-center text-[#D0D0D0] text-base">Role</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

