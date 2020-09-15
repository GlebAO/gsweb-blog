import TagModel from "./TagModel"

export enum PostStatus {
    ACTIVE = 10,
    DRAFT = 9,
    ARCHIVED = 0,
}

export default interface PostModel {
    id: number,
    title: string,
    slug: string,
    content?: string
    userId: number
    createdAt: string
    updatedAt: string
    status: PostStatus
    user: {
        name: string
    }
    tags?: TagModel[]
}

export const postStatuses = [
    { val: PostStatus.ACTIVE, label: "Активен", classes: "text-success" },
    { val: PostStatus.DRAFT, label: "Черновик", classes: "text-danger" },
    { val: PostStatus.ARCHIVED, label: "Архивирован", classes: "text-muted" },
]