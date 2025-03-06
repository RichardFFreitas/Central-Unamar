export interface News {
    id: number,
    user_id?: number,
    title: string,
    excerpt: string,
    content?: string,
    category: string,
    image: string,
    date?: string
}