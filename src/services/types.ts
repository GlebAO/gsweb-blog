import PostModel from "../types/PostModel";

export interface BlogServiceInterface {
    getPosts(): Promise<PostModel[]>,
    test(): void
}