import PostModel from "../types/PostModel";
import { SignupFormValues } from "../pages/auth/signup";
import { LoginFormValues } from "../pages/auth/login";
import { PostFormValues } from "../components/post/post-form/post-form"

export interface BlogServiceInterface {
    getPosts(): Promise<PostModel[]>,
    getPostBySlug(slug: string):Promise<PostModel>,
    createPost(values:PostFormValues):Promise<any>,
    updatePost(postId:number, values:PostFormValues):Promise<any>,
    test(): void
}

export interface AuthServiceInterface {
    signup(credentials: SignupFormValues): Promise<any>
    login(credentials: LoginFormValues): Promise<any>
}