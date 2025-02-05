"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Member } from "@/types/team"

interface MemberModalProps {
  mode: "add" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormData) => Promise<void>
  memberData?: Member | null // ข้อมูลเดิม ถ้าเป็นโหมด edit
}

export function MemberModal({
  mode,
  open,
  onOpenChange,
  onSubmit,
  memberData,
}: MemberModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // ฟิลด์ต่าง ๆ ที่ต้องการให้แก้ไข
  // ในโหมด edit จะเติมค่าจาก memberData
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [startDate, setStartDate] = useState("")

  // ถ้ามี memberData เปลี่ยนเมื่อไหร่ (หรือเปิด modal) ให้ set ค่าลงฟอร์ม
  useEffect(() => {
    if (mode === "edit" && memberData) {
      setName(memberData.name || "")
      setPosition(memberData.position || "")
      setRoleDescription(memberData.roleDescription || "")
      if (memberData.startDate) {
        // ถ้า startDate เป็น 'YYYY-MM-DD' อยู่แล้วก็ set ได้ตรง ๆ
        // หรือถ้าเป็นรูปแบบอื่นต้องแปลงเป็น YYYY-MM-DD ก่อน
        setStartDate(memberData.startDate)
      }
    } else {
      // ถ้าเป็น add หรือ memberData เปลี่ยนเป็น null
      setName("")
      setPosition("")
      setRoleDescription("")
      setStartDate("")
      setSelectedFile(null)
    }
  }, [mode, memberData, open])

  // จัดการ Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // เมื่อกด Submit จะส่ง FormData กลับไปให้ Parent
  // (แต่จะแยก logic กันว่าถ้าเป็น add จะเรียก POST, ถ้า edit จะเรียก PUT)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()

    // ถ้ามีไฟล์ใหม่ที่เลือกไว้ (กรณี edit อาจจะไม่เปลี่ยนรูปก็ได้)
    if (selectedFile) {
      formData.append("image", selectedFile)
    }
    // กรณี mode = edit แต่ไม่ได้เลือกไฟล์ใหม่ => ไม่ต้อง append image
    // (API ฝั่ง server ต้องเขียนให้รองรับการไม่เปลี่ยนรูปด้วย)

    formData.append("name", name)
    formData.append("position", position)
    formData.append("roleDescription", roleDescription)
    formData.append("startDate", startDate)

    // เรียก onSubmit แล้วปิด modal
    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Member" : "Add Member"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <div className="relative">
              <Input
                type="date"
                id="joinDate"
                name="startDate"
                required
                className="pl-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Drag and Drop File */}
          <div className="space-y-2">
            <Label>Upload Photo</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2">
                {selectedFile ? (
                  <>
                    <p className="text-sm text-gray-600">
                      Selected file: {selectedFile.name}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    {mode === "edit" && memberData?.imageUrl && (
                      <img
                        src={memberData.imageUrl}
                        alt="current image"
                        className="w-28 h-28 object-cover mx-auto mb-2"
                      />
                    )}
                    <p className="text-sm text-gray-600">
                      Drag and Drop file here or Choose File
                    </p>
                    <p className="text-xs text-gray-500">
                      (jpg, png formats, up to 50MB)
                    </p>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={handleFileSelect}
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
                    >
                      Browse
                    </Label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Name, Position, Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">
                Position<span className="text-red-500">*</span>
              </Label>
              <Input
                id="position"
                name="position"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roleDescription">
              Description / Quote<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="roleDescription"
              name="roleDescription"
              required
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {mode === "edit" ? "Update" : "Save change"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
