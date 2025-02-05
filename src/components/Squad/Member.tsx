import { MemberCardProps } from "@/types/Member_Squad";

export function MemberCard({
  name,
  image,
  description,
  position,
}: MemberCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden
                    mx-auto w-full max-w-sm"
    >
      <div className="aspect-[4/5] relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 bg-[#F5F5F8]">
        <h3 className="text-xl font-bold text-center">{name}</h3>
        <h4 className="text-sm text-center mb-4 text-[#1A2238]">
          {position} {/* แสดงตำแหน่ง */}
        </h4>
        <p className="text-md text-gray-600 italic text-center">
          "{description}"
        </p>
      </div>
    </div>
  );
}
