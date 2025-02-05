"use client"

import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

interface GalleryCardProps {
  id: number
  date: string
  title: string
  description: string
  picture: string
  onEdit: () => void
  onDelete: (id: number) => void
}

export function GalleryCard({
  id,
  date,
  title,
  description,
  picture,
  onEdit,
  onDelete
}: GalleryCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 flex gap-6 items-start">
      <div className="w-1/3">
        <img
          src={picture}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0 py-2">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm text-blue-500">{date}</p>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-blue-400">{description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
