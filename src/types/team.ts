export interface Member {
 id: number
 name: string
 position: string
 roleDescription: string
 startDate: string
 imageUrl: string
 deletedAt?: string | null // อาจเป็น null
 teamId: number
}

// Interface สำหรับ Team
export interface Team {
 id: number
 name: string
 description: string
 members: Member[] // Array ของ Member
 deletedAt?: string | null // อาจเป็น null
}

export interface TeamResponse {
 data: {
  data: Team[] // Array ของ Team อยู่ในฟิลด์ `data`
  hasNextPage: boolean
  limit: number
  page: number
  total: number
  totalPages: number
 }
}
