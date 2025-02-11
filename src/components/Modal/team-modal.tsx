"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseAPI } from "@/apis/useAPI"
import { API } from "@/apis/API"
import type { Team } from "@/types/team"

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  team?: Team | null
}

export function TeamModal({ isOpen, onClose, onSave, team }: TeamModalProps) {
  const [formData, setFormData] = useState<Partial<Team>>({
    name: "",
    description: "",
  })

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description,
      })
    } else {
      setFormData({
        name: "",
        description: "",
      })
    }
  }, [team])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (team) {
        // Edit team
        await UseAPI({
          url: `${API.team}/${team.id}`,
          method: "PUT",
          data: formData,
        })
      } else {
        // Add new team
        await UseAPI({
          url: API.team,
          method: "POST",
          data: formData,
        })
      }
      onSave()
      onClose()
    } catch (error) {
      console.error("Error saving team:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{team ? "Edit Team" : "Add Team"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Team Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
