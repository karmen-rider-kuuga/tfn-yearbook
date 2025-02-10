import { motion } from "framer-motion"
import { TimelineItemProps } from "../../types/Gallery_Timeline"

interface ExtendedTimelineItemProps extends TimelineItemProps {
  animationDelay?: number
}

export default function TimelineItem({
  dateSub,
  title,
  description,
  imageUrl,
  imagePosition = "left",
  animationDelay = 0,
}: ExtendedTimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="relative"
    >
      <div
        className={`grid md:grid-cols-2 gap-8 ${imagePosition === "right" ? "md:[grid-template-areas:'text_image']" : ""
          }`}
      >
        {/* Image Container */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${imagePosition === "right" ? "md:order-2" : ""
            }`}
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
            src={
              imageUrl ||
              "https://via.placeholder.com/800x450?text=No+Image"
            }
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, x: imagePosition === "right" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: animationDelay + 0.3 }}
          className={`space-y-3 flex flex-col pt-4 ${imagePosition === "right" ? "md:order-1 md:pr-8" : "md:pl-8"
            }`}
        >
          <time className="text-sm text-[#6A90CC] font-medium tracking-wide">
            {dateSub}
          </time>
          <h3 className="text-xl md:text-2xl font-semibold text-[#1B2A4A] leading-tight">
            {title}
          </h3>
          <p className="text-[#6A90CC] leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
