import PostModel from "../types/PostModel";
import { SignupFormValues } from "../pages/signup";

export interface BlogServiceInterface {
    getPosts(): Promise<PostModel[]>,
    getPostBySlug(slug: string):Promise<PostModel>,
    test(): void
}

export interface AuthServiceInterface {
    signup(credentials: SignupFormValues): Promise<any>
}