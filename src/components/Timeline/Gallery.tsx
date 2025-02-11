import { GalleryItem } from "../../types/Gallery_Timeline"
import { useEffect, useMemo, useState } from "react"
import { UseAPI } from "@/apis/useAPI"
import TimelineItem from "./TimelineItem"
import { useTimelineContext } from "@/contexts/TimelineContext"
import { motion } from "framer-motion"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const { setYears, selectedYear, setSelectedYear } = useTimelineContext()

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
      setGalleryData(data)

      // หา unique year
      const uniqueYears: string[] = Array.from(
        new Set(
          data.map((item: GalleryItem) =>
            new Date(item.eventDate).getFullYear().toString()
          )
        )
      )
      setYears(uniqueYears)
      // หากยังไม่มี selectedYear ให้ set เป็นปีแรก
      if (uniqueYears.length > 0 && !selectedYear) {
        setSelectedYear(uniqueYears[0])
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  // แยกกลุ่มตามเดือน
  const groupedByMonth = useMemo(() => {
    return galleryData
      .filter(item => new Date(item.eventDate).getFullYear().toString() === selectedYear)
      .reduce((acc, item) => {
        const monthIndex = new Date(item.eventDate).getMonth()
        if (!acc[monthIndex]) {
          acc[monthIndex] = []
        }
        acc[monthIndex].push(item)
        return acc
      }, {} as Record<number, GalleryItem[]>)
  }, [galleryData, selectedYear])

  // สร้าง array ที่เรียงตามเดือน 0–11
  const monthEntries = useMemo(() => {
    return Object.entries(groupedByMonth).sort((a, b) => Number(a[0]) - Number(b[0]))
  }, [groupedByMonth])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative container mx-auto px-4 py-8 mt-10 font-Montserrat">

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"
      />

      {monthEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-gray-500 font-medium"
        >
          No data available
        </motion.div>
      ) : (
        <div>
          {monthEntries.map(([monthIndex, items], monthIdx) => {
            const monthNumber = Number(monthIndex)
            const monthLabel = `${monthNames[monthNumber]} ${selectedYear}`

            return (
              <motion.div
                key={monthIndex}
                className="relative mb-16 pl-12" // เว้นซ้าย 12px จากเส้น timeline
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: monthIdx * 0.2 }}
              >
                {/* ชื่อเดือน */}
                <div className="mb-6">
                  <span className="text-sm font-semibold text-[#F86F03]">
                    {monthLabel}
                  </span>
                </div>

                {/* แสดงรายการในเดือนนั้น */}
                <div className="space-y-16">
                  {items.map((item) => (
                    <TimelineItem
                      key={item.id}
                      dateSub={new Date(item.eventDate).toDateString()}
                      title={item.caption}
                      description={item.description}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
