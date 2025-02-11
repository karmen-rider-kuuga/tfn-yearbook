"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export default function Home() {
  let navigate = useNavigate();
  const { toast } = useToast()
  const { isAuthenticated, login } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")

  const onOpenConsole = () => {
    if (isAuthenticated) {
      navigate("/admin")
    } else {
      setIsOpen(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const weakPasswords = ["admin1234", "opec", "est", "kong"];

    if (weakPasswords.includes(password)) {
      login()
      navigate("/admin")
    } else {
      toast({
        title: "รหัสผ่านไม่ถูกต้อง",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 overflow-hidden">
            Welcome to TrustFinance Yearbook
          </h1>
          <h2 className="text-3xl md:text-5xl font-kanit font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            ยินดีต้อนรับสู่ระบบ TrustFinance Yearbook
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Capture and preserve your memories in our digital yearbook platform. Create, manage, and share your school's
            legacy.
          </p>
          <div className="pt-8">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              onClick={onOpenConsole}
            >
              Go to Console
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันตัวตน</DialogTitle>
            <DialogDescription>กรุณาใส่รหัสผ่านเพื่อเข้าสู่ Admin Console</DialogDescription>
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
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                ยกเลิก
              </Button>
              <Button type="submit">ยืนยัน</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </main>
  )
}

