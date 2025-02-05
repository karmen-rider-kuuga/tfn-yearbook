import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { colors } from "@/configs/colors";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation(); // ใช้ useLocation เพื่อดึง URL ปัจจุบัน

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-Montserrat">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0e1829] text-[#D9EAFD]">
        <div className="p-4 flex flex-col items-center gap-3">
          <div className="bg-white text-[#1a2234] font-bold p-2 rounded">NN</div>
          <span className="text-lg font-semibold">ADMIN TRUSTFINANCE</span>
        </div>

        <nav className="p-2 space-y-1">
          <Link
            to="/gallery-management"
            className={`block px-4 py-2 text-[#D9EAFD] rounded-lg ${location.pathname === "/gallery-management" ? "bg-[#355c9b] bg-opacity-30" : "hover:bg-gray-700"
              }`}
          >
            Gallery
          </Link>
          <Link
            to="/squad-management"
            className={`block px-4 py-2 text-[#D9EAFD] rounded-lg ${location.pathname === "/squad-management" ? "bg-[#355c9b] bg-opacity-30" : "hover:bg-gray-700"
              }`}
          >
            Squad
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header
          style={{ backgroundColor: colors.primary.background, color: colors.primary.textLight }}
          className="border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="TrustFinance Logo"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-semibold">TrustFinance Yearbook Console</h1>
          </div>
          <Button variant="ghost" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </header>

        {children}
      </main>
    </div>
  );
}
