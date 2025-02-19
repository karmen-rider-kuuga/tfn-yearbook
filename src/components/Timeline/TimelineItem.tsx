import { motion } from "framer-motion"
import { TimelineItemProps } from "../../types/Gallery_Timeline"

interface ExtendedTimelineItemProps extends TimelineItemProps {
  animationDelay?: number
  index: number
}

export default function TimelineItem({
  dateSub,
  title,
  description,
  imageUrl,
  animationDelay = 0,
  index, // ✅ ใช้ index เพื่อสลับตำแหน่ง
}: ExtendedTimelineItemProps) {
  // ✅ ตรวจสอบว่า index เป็นเลขคู่หรือคี่
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`
        relative flex flex-col space-y-4 
        lg:space-y-0 lg:flex-row lg:items-start lg:space-x-8 mb-16 
        ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"}
      `}
    >
      {/* ✅ เพิ่มระยะห่างระหว่างรูปและเนื้อหา */}
      <div className={`lg:flex-1 text-left space-y-3 ${isEven ? "lg:pl-8" : "lg:pr-8"}`}>
        <time className="text-base lg:text-sm text-[#6A90CC] font-medium tracking-wide">
          {dateSub}
        </time>
        <h3 className="text-2xl lg:text-2xl font-semibold text-[#1B2A4A] leading-tight">
          {title}
        </h3>
        <p className="text-[#6A90CC] leading-relaxed">
          {description}
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="w-full h-auto flex-shrink-0 lg:w-[600px] lg:h-[335px]"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
          src={imageUrl || "https://via.placeholder.com/600x335?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  )
}
