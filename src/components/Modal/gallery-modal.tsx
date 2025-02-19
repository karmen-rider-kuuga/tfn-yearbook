"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GalleryItem } from "@/types/Gallery_Timeline"

interface GalleryModalProps {
  mode: "add" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (formData: FormData) => Promise<void>
  galleryData?: GalleryItem | null
}

export function GalleryModal({
  mode,
  open,
  onOpenChange,
  onSubmit,
  galleryData
}: GalleryModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // ฟิลด์ในฟอร์ม
  const [eventDate, setEventDate] = useState("")
  const [caption, setCaption] = useState("")
  const [description, setDescription] = useState("")

  // หากเป็นโหมด edit ให้ set ค่าฟอร์มเป็นของเดิม
  useEffect(() => {
    if (mode === "edit" && galleryData) {
      setEventDate(galleryData.eventDate ? galleryData.eventDate.slice(0, 10) : "")
      // slice(0,10) กรณีวันที่เป็นรูปแบบ "YYYY-MM-DDTHH:mm:ss" จะเอาเฉพาะ YYYY-MM-DD
      setCaption(galleryData.caption || "")
      setDescription(galleryData.description || "")
    } else {
      // ถ้าเป็น add หรือปิด modal แล้วเปิดใหม่ให้เคลียร์ค่า
      setEventDate("")
      setCaption("")
      setDescription("")
      setSelectedFile(null)
    }
  }, [mode, galleryData, open])

  // Drag & Drop handlers
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

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    // กรณีเป็น add หรือ edit แล้วอัปโหลดรูปใหม่
    if (selectedFile) {
      formData.append("image", selectedFile)
    }
    // (ถ้าเป็น edit แต่ไม่ได้อัปโหลดไฟล์ใหม่ ให้ฝั่ง API รองรับว่ายังใช้รูปเดิม)

    // field อื่นๆ
    formData.append("eventDate", eventDate)
    formData.append("caption", caption)
    formData.append("description", description)

    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Photo" : "Add Photo Gallery"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                type="date"
                id="date"
                name="eventDate"
                required
                className="pl-10"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Drag and Drop */}
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
                    {/* แสดงรูปเก่ากรณีโหมด edit (ถ้าไม่ได้เลือกไฟล์ใหม่) */}
                    {mode === "edit" && galleryData?.imageUrl && (
                      <img
                        src={galleryData.imageUrl}
                        alt="current"
                        className="w-28 h-28 object-cover mx-auto mb-2 rounded"
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

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">
              Caption<span className="text-red-500">*</span>
            </Label>
            <Input
              id="caption"
              name="caption"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Update Photo" : "Save Photo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
