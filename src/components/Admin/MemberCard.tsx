"use client"

import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export interface MemberCardProps {
  id: number
  name: string
  role: string
  joinDate: string
  description: string
  imageUrl?: string
  onEdit: (memberId: number) => void | (() => void)
  onDelete: (memberId: number) => void
}

export function MemberCard({
  id,
  name,
  role,
  joinDate,
  description,
  imageUrl,
  onEdit,
  onDelete,
}: MemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 relative">
      {/* Profile Image */}
      <div className="h-full w-1/4 rounded-md bg-gray-200 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
        ) : (
          <div className="bg-gray-300 w-full h-full" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-sm text-gray-400 mt-1">Joined: {joinDate}</p>
        <p className="mt-3 text-sm italic text-gray-600">{description}</p>
      </div>

      {/* Actions */}
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => onEdit(id)}
              className="text-sm text-gray-800 hover:bg-gray-100"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="text-sm text-red-500 hover:bg-gray-100"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
