import { MemberCardProps } from "@/types/Member_Squad";
import { motion } from "framer-motion";

export function MemberCard({
  name,
  image,
  description,
  position,
}: MemberCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full max-w-sm group transition-transform duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <motion.img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
  );
}
