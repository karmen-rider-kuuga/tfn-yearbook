import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { colors } from "../configs/colors";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, login } = useAuth();

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate("/admin");
    } else {
      setModalOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weakPasswords = ["admin1234", "opec", "est", "kong", "tfn_2025"];

    if (weakPasswords.includes(password)) {
      login();
      navigate("/admin");
    } else {
      toast({
        title: "รหัสผ่านไม่ถูกต้อง",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  };

  return (
    <nav
      style={{ backgroundColor: colors.navbar.background, color: colors.navbar.text }}
      className="p-4 shadow-lg font-Montserrat"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* โลโก้ */}
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="TrustFinance Logo" className="h-8 w-8" />
          <Link to="/" className="text-xl tracking-wide">
            TrustFinance Yearbook
          </Link>
        </div>

        {/* เมนูปกติ (Desktop) */}
        <div className="hidden md:flex text-xl uppercase gap-16">

          <Link
            to="/timeline"
            style={{
              textDecorationColor:
                location.pathname === "/timeline" ? colors.navbar.yellow : "transparent",
            }}
            className={`underline-offset-8 decoration-2 ${location.pathname === "/timeline" ? "underline" : "hover:underline"
              }`}
          >
            Timeline
          </Link>

          <Link
            to="/squad"
            style={{
              textDecorationColor:
                location.pathname === "/squad" ? colors.navbar.yellow : "transparent",
            }}
            className={`underline-offset-8 decoration-2 ${location.pathname === "/squad" ? "underline" : "hover:underline"
              }`}
          >
            Squad
          </Link>

          <div
            onClick={handleAdminClick}
            style={{
              textDecorationColor:
                location.pathname === "/admin" ? colors.navbar.yellow : "transparent",
              cursor: "pointer",
            }}
            className={`underline-offset-8 decoration-2 ${location.pathname === "/admin" ? "underline" : "hover:underline"
              }`}
          >
            Admin
          </div>
        </div>

        {/* Burger Menu (Mobile) */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* เมนู Mobile */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-blue-800 p-4 rounded-lg">
          <Link
            to="/timeline"
            className={`block p-2 rounded ${location.pathname === "/timeline" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
          >
            Timeline
          </Link>
          <Link
            to="/squad"
            className={`block p-2 rounded ${location.pathname === "/squad" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
          >
            Squad
          </Link>
        </div>
      )}

      {/* Modal สำหรับ Admin */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันตัวตน</DialogTitle>
            <DialogDescription>
              กรุณาใส่รหัสผ่านเพื่อเข้าสู่ Admin Console
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="ใส่รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                ยกเลิก
              </Button>
              <Button type="submit">ยืนยัน</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </nav>
  );
}