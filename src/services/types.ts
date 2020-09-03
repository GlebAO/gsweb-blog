import PostModel, { PostStatus } from "../types/PostModel";
import UserModel, { UserRole, UserStatus } from "../types/UserModel";
import { SignupFormValues } from "../pages/auth/signup";
import { LoginFormValues } from "../pages/auth/login";
import { PostFormValues } from "../components/post/post-form/post-form"

export interface UserFormValues {
    role?: UserRole
    status?: UserStatus
}

export type EntityWithTotal<T> = [T[], number];

export interface BlogServiceInterface {
    getPosts(page?: number, perPage?: number): Promise<EntityWithTotal<PostModel>>,
    getAllPosts(page?: number, perPage?: number): Promise<EntityWithTotal<PostModel>>,
    getPostBySlug(slug: string): Promise<PostModel>,
    createPost(values: PostFormValues): Promise<any>,
    updatePost(postId: number, values: PostFormValues): Promise<any>,
    managePost(postId: number, values: { status: PostStatus }): Promise<any>,
    getUsers(): Promise<[UserModel[], number]>,
    updateUser(userId: number, values: UserFormValues): Promise<any>,
    test(): void
}

export interface AuthServiceInterface {
    signup(credentials: SignupFormValues): Promise<any>
    login(credentials: LoginFormValues): Promise<any>
}