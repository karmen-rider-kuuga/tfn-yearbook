"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Admin/Layout"
import { GalleryCard } from "@/components/Admin/GalleryCard"
import { UseAPI } from "@/apis/useAPI"
import { GalleryItem } from "@/types/Gallery_Timeline"
import { API } from "@/apis/API"
import { GalleryModal } from "@/components/Modal/gallery-modal"

export default function GalleryManagement() {
  const [year, setYear] = useState("all") // Default "all"
  const [loading, setLoading] = useState(true)
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([])
  const [uniqueYears, setUniqueYears] = useState<string[]>(([]))

  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false)
  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false)
  const [galleryToEdit, setGalleryToEdit] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetchGallery()
  }, [])

  // ---- GET Gallery ----
  async function fetchGallery() {
    try {
      setLoading(true)
      const res = await UseAPI({
        url: API.gallery,
        params: {
          page: 1,
          limit: 10,
        },
        method: "GET",
      })
      const data = res.data.data || []
      setGalleryData(data)

      // ดึงปีจาก eventDate มาเป็นตัวเลือก
      const years: any = Array.from(
        new Set(
          data.map((item: GalleryItem) => new Date(item.eventDate).getFullYear().toString())
        )
      ).sort()
      setUniqueYears(["all", ...years]) // เพิ่ม "all" ไว้ที่ตัวเลือกแรก
      setYear("all")
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  // ---- CREATE New Photo (POST) ----
  async function handleAddPhoto(formData: FormData) {
    try {
      setLoading(true)
      await UseAPI({
        url: API.gallery,
        data: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await fetchGallery()
    } catch (error) {
      console.error("Error from post gallery :", error)
    } finally {
      setLoading(false)
    }
  }

  // ---- UPDATE Photo (PUT) ----
  async function handleUpdatePhoto(id: number, formData: FormData) {
    try {
      setLoading(true)
      UseAPI({
        url: API.gallery + `/update/${id}`,
        data: formData,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await fetchGallery()
    } catch (error) {
      console.error("Error updating gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  // ---- DELETE Photo ----
  async function deleteGalleryById(id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this item?")
    if (!confirmDelete) return

    try {
      setLoading(true)
      await UseAPI({
        url: API.gallery + `/${id}`,
        method: "DELETE",
      })
      await fetchGallery()
    } catch (error) {
      console.error("Error deleting gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  // ---- เปิด modal สำหรับแก้ไขรูป ----
  function openEditModal(item: GalleryItem) {
    setGalleryToEdit(item)
    setIsEditPhotoOpen(true)
  }

  // ---- Filter ข้อมูลตาม year ----
  const filteredGallery = galleryData.filter(
    (item) =>
      year === "all" || new Date(item.eventDate).getFullYear().toString() === year
  )

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Gallery Management</h2>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {uniqueYears.map((yr) => (
                <SelectItem key={yr} value={yr}>
                  {yr === "all" ? "All" : yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8">
          <Button
            onClick={() => setIsAddPhotoOpen(true)}
            variant="outline"
            className="mx-auto flex gap-2"
            size={isAddPhotoOpen ? "sm" : "lg"}
          >
            <span>+</span> Add Photo Gallery
          </Button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredGallery.map((item) => (
              <GalleryCard
                key={item.id}
                id={item.id}
                date={item.eventDate}
                title={item.caption}
                description={item.description}
                picture={item.imageUrl}
                // เมื่อกด Edit จะเปิด modal พร้อมข้อมูล item
                onEdit={() => openEditModal(item)}
                // เมื่อกด Delete จะลบรูป
                onDelete={deleteGalleryById}
              />
            ))
          )}
        </div>

        {/* Modal สำหรับ Add Photo */}
        <GalleryModal
          mode="add"
          open={isAddPhotoOpen}
          onOpenChange={setIsAddPhotoOpen}
          onSubmit={async (formData) => {
            await handleAddPhoto(formData)
            setIsAddPhotoOpen(false)
          }}
        />

        {/* Modal สำหรับ Edit Photo */}
        <GalleryModal
          mode="edit"
          open={isEditPhotoOpen}
          galleryData={galleryToEdit}
          onOpenChange={(open) => {
            setIsEditPhotoOpen(open)
            if (!open) setGalleryToEdit(null)
          }}
          onSubmit={async (formData) => {
            if (galleryToEdit) {
              await handleUpdatePhoto(galleryToEdit.id, formData)
            }
            setIsEditPhotoOpen(false)
          }}
        />
      </div>
    </Layout >
  )
}
