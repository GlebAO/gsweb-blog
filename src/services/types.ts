import PostModel from "../types/PostModel";

export interface BlogServiceInterface {
    getPosts(): Promise<PostModel[]>,
    getPostBySlug(slug: string):Promise<PostModel>,
    test(): void
}