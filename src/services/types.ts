import PostModel, { PostStatus } from "../types/PostModel";
import UserModel, { UserRole, UserStatus } from "../types/UserModel";
import TagModel from "../types/TagModel";
import { SignupFormValues } from "../pages/auth/signup";
import { LoginFormValues } from "../pages/auth/login";
import { PostFormValues } from "../components/post/post-form/post-form"
import { CommentsFormValuesInterface } from "../components/comments/comments-form";
import CommentModel from "../types/CommentModel";

export interface UserFormValues {
    role?: UserRole
    status?: UserStatus
}

export type EntityWithTotal<T> = [T[], number];

export interface BlogServiceInterface {
    getPosts(page?: number, perPage?: number): Promise<EntityWithTotal<PostModel>>,
    getOwnPosts(page?: number, perPage?: number): Promise<EntityWithTotal<PostModel>>,
    getTags(page?: number, perPage?: number): Promise<EntityWithTotal<TagModel>>,
    getTagBySlug(slug: string): Promise<TagModel>,
    getAllPosts(page?: number, perPage?: number): Promise<EntityWithTotal<PostModel>>,
    getPostBySlug(slug: string): Promise<PostModel>,
    getOwnPostBySlug(slug: string): Promise<PostModel>,
    createPost(values: PostFormValues): Promise<any>,
    updatePost(postId: number, values: PostFormValues): Promise<any>,
    managePost(postId: number, values: { status: PostStatus }): Promise<any>,
    getUsers(): Promise<[UserModel[], number]>,
    updateUser(userId: number, values: UserFormValues): Promise<any>,
    createComment(values: CommentsFormValuesInterface): Promise<any>,
    updateComment(id: number, content: string): Promise<any>,
    test(): void,
    getComments(commentableId: string | number, commentabletype: string, page?: number, perPage?: number): Promise<EntityWithTotal<CommentModel>>,
    getAllComments(): Promise<any>,
    deleteComment(id: number): Promise<any>,
    updateSitemap(): Promise<any>
}
export interface AuthServiceInterface {
    signup(credentials: SignupFormValues): Promise<any>
    login(credentials: LoginFormValues): Promise<any>
    confirm(token: string): Promise<any>
}