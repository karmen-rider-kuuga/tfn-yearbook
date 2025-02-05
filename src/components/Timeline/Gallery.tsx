import { GalleryItem } from "../../types/Gallery_Timeline";
import { useEffect, useState } from "react";
import { UseAPI } from "@/apis/useAPI";
import TimelineItem from "./TimelineItem";
import { useTimelineContext } from "@/contexts/timelineContent";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { setYears, selectedYear, setSelectedYear } = useTimelineContext();

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      setLoading(true);
      const res = await UseAPI({
        url: "gallery",
        params: {
          page: 1,
          limit: 10,
        },
        method: "GET",
      });

      // ดึงข้อมูล array จาก res.data.data
      setGalleryData(res.data.data || []);

      // ดึงปีที่ไม่ซ้ำ
      // แปลง years จาก Set กลับมาเป็น string[]
      const uniqueYears: any = Array.from(
        new Set(
          res.data.data.map((item: GalleryItem) =>
            new Date(item.eventDate).getFullYear().toString()
          )
        )
      );
      setYears(uniqueYears);
      if (uniqueYears.length > 0 && !selectedYear) {
        setSelectedYear(uniqueYears[0]);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 font-Montserrat">
      <div className="relative">
        {
          galleryData.length === 0 &&
          <div className="text-center">No data available</div>
        }
        {
          galleryData
            .filter((item) => new Date(item.eventDate).getFullYear().toString() === selectedYear)
            .map((item, index) => (
              <TimelineItem
                dateTitle={item.eventDate}
                dateSub={item.eventDate}
                title={item.caption}
                key={item.id}
                {...item}
                isLast={index === galleryData.length - 1} />
            ))}

      </div>
    </div>
  );
}
