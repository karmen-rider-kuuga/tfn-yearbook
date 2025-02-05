// Interface สำหรับ Item จาก API
export interface GalleryItem {
 id: number
 caption: string
 description: string
 eventDate: string
 imageUrl: string
 deletedAt?: string | null
}

// Interface สำหรับ Response หลักจาก API
export interface GalleryResponse {
 data: GalleryItem[]
 hasNextPage: boolean
 limit: number
 page: number
 total: number
 totalPages: number
}

// Props สำหรับ TimelineItem
export interface TimelineItemProps {
 dateTitle: string
 dateSub: string
 title: string
 description: string
 imageUrl: string
 imagePosition?: 'left' | 'right'
 isLast?: boolean
}
