import { useEffect, useState } from "react";
import { memberData } from "../../data/member-data";
import { Member, MemberCardProps } from "../../types/Member_Timeline";
import { UseAPI } from "@/apis/useAPI";
import { API } from "@/apis/API";
import { useTimelineContext } from "@/contexts/timelineContent";


export default function MemberList() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const { setYears, selectedYear, setSelectedYear } = useTimelineContext();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      setLoading(true);
      const res = await UseAPI({
        url: API.squad,
        method: "GET",
      });

      const members: Member[] = res.data.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        imageUrl: item.imageUrl,
        date: item.startDate, // ใช้ startDate จาก response
      }));

      console.log("members", members);
      setMembers(members);

      const uniqueYears = Array.from(
        new Set(members.map((item) => new Date(item.date).getFullYear().toString()))
      );

      setYears(uniqueYears);

      if (uniqueYears.length > 0 && !selectedYear) {
        setSelectedYear(uniqueYears[0]);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 font-Montserrat">
      <div className="relative">
        {
          // filter member by selected year
          members
            .filter((member) => new Date(member.date).getFullYear().toString() === selectedYear)
            .map((member, index) => (
              <MemberCard
                key={member.id}
                name={member.name}
                imageUrl={member.imageUrl || ""}
                date={member.date}
                isLast={index === members.length - 1}
                id={member.id} />
            ))
        }
      </div>
    </div>
  )
}

function MemberCard({ name, imageUrl, date, isLast }: MemberCardProps) {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-[2px]" />

      {/* Timeline line */}
      {!isLast && <div className="absolute left-0 top-4 bottom-0 w-px bg-gray-200" />}

      {/* Date */}
      <span className="font-semibold text-sm text-[#D87D2B] mb-4 block">{date}</span>

      {/* Card */}
      <div className="bg-white rounded-lg w-48 shadow-md">
        <div className="aspect-square relative">
          <img src={imageUrl} alt={name} className="object-cover" />
        </div>
        <div className="bg-[#F5F5F8]">
          <p className="font-semibold text-center text-gray-600 py-1">{name}</p>
          <p className="text-center text-[#D0D0D0] text-sm">{`Role`}</p>
        </div>
      </div>
    </div>
  )
}
