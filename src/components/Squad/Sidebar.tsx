import { colors } from "../../configs/colors";

interface SidebarProps {
  currentDepartment: string;
  setCurrentDepartment: (department: string) => void;
  departments: string[]; // List of department names
}

export function Sidebar({
  currentDepartment,
  setCurrentDepartment,
  departments,
}: SidebarProps) {
  return (
    <>
      {/* ✅ สำหรับจอใหญ่และจอกลาง */}
      <aside className="hidden md:block w-64 min-h-screen">
        <div className="p-4">
          <h2 className="text-lg mb-4 font-semibold">TrustFinance Squad</h2>
          <nav className="space-y-1">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setCurrentDepartment(department)}
                style={{
                  backgroundColor:
                    currentDepartment.toLowerCase() === department.toLowerCase()
                      ? colors.primary.background
                      : "transparent",
                  color:
                    currentDepartment.toLowerCase() === department.toLowerCase()
                      ? colors.primary.textLight
                      : colors.primary.background,
                  fontWeight:
                    currentDepartment.toLowerCase() === department.toLowerCase()
                      ? "600"
                      : "400",
                }}
                className="block px-4 py-2 rounded-full text-left w-full"
              >
                {department}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ✅ สำหรับจอเล็ก (Mobile) */}
      <div className="md:hidden px-4 py-2">
        <select
          value={currentDepartment}
          onChange={(e) => setCurrentDepartment(e.target.value)}
          className="block w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
