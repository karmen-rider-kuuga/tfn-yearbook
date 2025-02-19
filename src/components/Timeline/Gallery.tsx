import { GalleryItem } from "../../types/Gallery_Timeline"
import { useEffect, useMemo, useState } from "react"
import { UseAPI } from "@/apis/useAPI"
import TimelineItem from "./TimelineItem"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
  }, [])

  async function fetchGallery() {
    try {
      setLoading(true)
      const res = await UseAPI({
        url: "gallery",
        params: {
          page: 1,
          limit: 10,
        },
        method: "GET",
      })

      const data = res.data.data || []
      // เรียงลำดับข้อมูลจากวันที่ล่าสุดลงมา
      const sortedData = data.sort((a: GalleryItem, b: GalleryItem) =>
        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
      )
      setGalleryData(sortedData)
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  // แยกกลุ่มตามเดือนและปี
  const groupedByMonthAndYear = useMemo(() => {
    return galleryData.reduce((acc, item) => {
      const date = new Date(item.eventDate)
      const year = date.getFullYear()
      const monthIndex = date.getMonth()
      const key = `${year}-${monthIndex}`

      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    }, {} as Record<string, GalleryItem[]>)
  }, [galleryData])

  const monthAndYearEntries = useMemo(() => {
    return Object.entries(groupedByMonthAndYear).sort((a, b) => {
      const [yearA, monthA] = a[0].split('-')
      const [yearB, monthB] = b[0].split('-')
      return new Date(`${yearB}-${monthB}-01`).getTime() - new Date(`${yearA}-${monthA}-01`).getTime()
    })
  }, [groupedByMonthAndYear])

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

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-8 py-8 mt-10 font-Montserrat">
      {monthAndYearEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-gray-500 font-medium"
        >
          No data available
        </motion.div>
      ) : (
        <div className="space-y-32">
          {monthAndYearEntries.map(([key, items], monthIdx) => {
            const [year, monthIndex] = key.split('-');
            const monthNumber = Number(monthIndex);
            const monthLabel = `${monthNames[monthNumber]} ${year}`;

            return (
              <motion.div
                key={key}
                className="relative flex flex-col lg:flex-row lg:items-start lg:space-x-8 mb-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: monthIdx * 0.2 }}
              >
                {/* 🔶 เส้น Timeline สำหรับจอใหญ่ */}
                <div className="absolute left-8 top-[2rem] bottom-0 w-[1px] bg-[#CCCFE5] z-0 hidden lg:block"></div>

                {/* 🔶 ชื่อเดือนวางตรงกลางและปรับให้ใหญ่ขึ้น */}
                <div className="text-center mx-auto mb-4 lg:absolute lg:left-[0.5rem] lg:transform lg:-translate-x-[50%] lg:-translate-y-1/2 lg:top-0 lg:text-left z-10">
                  <span className="text-xl lg:text-sm font-semibold text-[#F86F03] block">
                    {monthLabel}
                  </span>
                </div>

                {/* 🔄 แสดงรายการในเดือนนั้น */}
                <div className="flex-1 space-y-12 pt-8 pl-2 lg:pl-20">
                  {items.map((item, index) => (
                    <TimelineItem
                      key={item.id}
                      dateSub={new Date(item.eventDate).toDateString()}
                      title={item.caption}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      imagePosition={index % 2 === 1 ? "right" : "left"}
                      animationDelay={index * 0.1}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  )
}