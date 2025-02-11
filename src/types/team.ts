export interface Member {
 id: number
 name: string
 position: string
 roleDescription: string
 startDate: string
 imageUrl: string
 deletedAt?: string | null
 teamId: number
}

export interface Team {
 id: number
 name: string
 description: string
 members: Member[]
 deletedAt?: string | null
}

export interface TeamResponse {
 data: {
  data: Team[]
  page: number
  limit: number
  search: {
   name: string | null
  }
  hasNextPage: boolean
  totalPages: number
  total: number
 }
}
