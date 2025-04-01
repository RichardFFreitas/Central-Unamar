export interface News {
    id: number,
    user_id?: number,
    title: string,
    slug: string,
    excerpt: string,
    content?: string,
    category: string,
    images: string,
    date?: string
}