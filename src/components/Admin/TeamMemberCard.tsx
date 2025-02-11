import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Member } from "@/types/team"

interface TeamMemberCardProps {
  member: Member
  onEdit: () => void
  onDelete: () => void
}

export function TeamMemberCard({ member, onEdit, onDelete }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden">
      <img
        src={member.imageUrl || "/placeholder.svg?height=200&width=200"}
        alt={member.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.position}</p>
        <p className="text-sm">{member.roleDescription}</p>
        <p className="text-xs text-gray-400">Started: {new Date(member.startDate).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

