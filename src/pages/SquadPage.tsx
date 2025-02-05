import { useEffect, useState } from "react";
import { Sidebar } from "../components/Squad/Sidebar";
import { MemberCard } from "../components/Squad/Member";
import { UseAPI } from "../apis/useAPI";
import { Member, Team, TeamResponse } from "@/types/team";
import { API } from "@/apis/API";

export default function SquadPage() {
  const [currentDepartment, setCurrentDepartment] = useState(""); // Default is empty
  const [departments, setDepartments] = useState<Team[]>([]); // ค่าเริ่มต้นเป็น array เปล่า
  const [teamMembers, setTeamMembers] = useState<Member[]>([]); // Members in the selected team
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (currentDepartment) {
      const selectedTeam = departments.find(
        (team) => team.name.toLowerCase() === currentDepartment.toLowerCase()
      );
      setTeamMembers(selectedTeam?.members || []);
    }
  }, [currentDepartment, departments]);

  async function fetchTeams() {
    try {
      setLoading(true);
      const res: TeamResponse = await UseAPI({
        url: API.team,
        method: "GET",
      });

      if (Array.isArray(res.data.data)) {
        setDepartments(res.data.data);
        setCurrentDepartment(res.data.data[0]?.name || "");
      } else {
        console.error("Expected res.data.data to be an array, but got:", res.data.data);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-[#F8F8FF] font-['Montserrat'] px-4 sm:px-8 lg:px-16 py-6">
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          departments={Array.isArray(departments) ? departments.map((team) => team.name) : []}
        />

        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <section>
            <h2 className="text-2xl font-bold mb-8 text-[#1A2238] tracking-wide uppercase">
              {currentDepartment || "Loading..."}
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {teamMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    name={member.name}
                    image={member.imageUrl}
                    description={member.roleDescription}
                    position={member.position}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
