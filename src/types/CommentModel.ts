export enum CommentTypes {
    POST = "post",
}

export default interface CommentModel {
    id: number,
    commentableType: CommentTypes,
    postId: number,
    content: string
    createdAt: string
    updatedAt: string
    author: {
        name: string
        imageUrl: string
    }
    parentId?: number
    children?: CommentModel[]
    userId: number
}