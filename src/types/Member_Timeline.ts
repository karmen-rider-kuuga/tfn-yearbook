export interface Member {
 id: string
 name: string
 imageUrl?: string
 date: string
 position: string
}

export interface MemberCardProps extends Member {
 isLast?: boolean
}
