export interface Member {
 id: string
 name: string
 imageUrl?: string
 date: string
}

export interface MemberCardProps extends Member {
 isLast?: boolean
}
