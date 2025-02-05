import { TimelineItemProps } from "../../types/Gallery_Timeline";
import { colors } from "../../configs/colors";

export default function TimelineItem({
  dateTitle,
  dateSub,
  title,
  description,
  imageUrl,
  imagePosition = "left",
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-[2px]" />

      {/* Timeline line */}
      {!isLast && <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200" />}

      {/* Date title */}
      <span
        style={{ color: colors.chocolate }}
        className="font-Montserrat font-semibold text-sm mb-4 block">{dateTitle}</span>

      {/* Content grid */}
      <div className={`grid md:grid-cols-2 gap-8 ${imagePosition === "right" ? "md:grid-flow-dense" : ""}`}>
        {/* Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm">
          <img src={imageUrl} alt={title} className="object-cover" />
        </div>

        {/* Text content */}
        <div className="space-y-2 flex flex-col pt-4">
          <span className="text-sm text-[#6A90CC]">{dateSub}</span>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-[#6A90CC]">{description}</p>
        </div>
      </div>
    </div>
  );
}
