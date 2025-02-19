import { MemberCardProps } from "@/types/Member_Squad";
import { motion } from "framer-motion";

export function MemberCard({
  name,
  image,
  description,
  position,
}: MemberCardProps) {
  return (
    <>
      {/* ✅ Design สำหรับจอใหญ่และจอกลาง */}
      <motion.div
        className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full max-w-sm group transition-transform duration-300 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        <div className="aspect-[4/5] relative overflow-hidden">
          <motion.img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 z-10"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <motion.div
          className="p-6 bg-[#F5F5F8] group-hover:bg-[#1B2F4F] transition-colors duration-300"
          initial={{ y: 30, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-xl font-bold text-center text-[#1B2F4F] group-hover:text-white transition-colors duration-300">
            {name}
          </h3>
          <h4 className="text-sm text-center mb-4 text-[#4B5563] group-hover:text-gray-300 transition-colors duration-300">
            {position}
          </h4>
          <motion.p
            className="text-md text-[#1B2F4F] italic text-center group-hover:text-gray-300 transition-colors duration-300"
            initial={{ y: 0, opacity: 1 }}
            whileHover={{ y: -4, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            "{description}"
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ✅ Design สำหรับจอเล็ก */}
      <motion.div
        className="block md:hidden bg-white rounded-xl w-full max-w-[92%] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden transform-gpu relative flex mx-auto h-[140px]"
        whileHover={{
          y: -5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div className="w-[35%] h-full rounded-l-xl overflow-hidden flex-shrink-0">
          <motion.img
            src={image || "/placeholder.svg"}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 transform-gpu"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <motion.div
          className="flex-1 bg-[#F5F5F8] p-4 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <p className="font-semibold text-gray-800 text-lg">{name}</p>
          <p className="text-gray-600 text-sm">{position}</p>
          <p className="text-gray-500 text-xs italic">{description}</p>
        </motion.div>
      </motion.div>
    </>
  );
}
