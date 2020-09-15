import PostModel, { PostStatus } from "../types/PostModel";
import UserModel, { UserRole, UserStatus} from "../types/UserModel";
import { BlogServiceInterface, UserFormValues } from "./types"
import { PostFormValues } from "../components/post/post-form/post-form"
import TagModel from "../types/TagModel";

export default class DummyBlogService implements BlogServiceInterface {

    _posts: PostModel[] = [
        { id: 1, title: 'Dummy first post', slug: 'slug1', content: 'We open a blog first time', createdAt: 'sdas', updatedAt: 'sdadsd', userId: 1, status: PostStatus.ACTIVE, user: {name: 'john'} },
        { id: 2, title: 'Dummy second post', slug: 'slug2', content: 'My second post is better than first', createdAt: 'sdas', updatedAt: 'sdadsd', userId: 1, status: PostStatus.DRAFT , user: {name: 'john'}}
    ]

    _users: UserModel[] = [
        { id: 1, name: "John", email: "john@mail.com", role: UserRole.ADMIN, createdAt: '', status: UserStatus.ACTIVE, lastLoggedIn: 2132312 },
        { id: 2, name: "Doe", email: "doen@mail.com", role: UserRole.GUEST, createdAt: '', status: UserStatus.ACTIVE, lastLoggedIn: 12312123 }
    ]

    _tags: TagModel[] = [
        {id: 1, title: "super_tag", slug:"super-tag", score: 10}
    ]
    
    getPosts() {
        return new Promise<[PostModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._posts, 10]);
                }
            }, 700);
        });
    }

    getTags() {
        return new Promise<[TagModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._tags, 10]);
                }
            }, 700);
        });
    }

    getAllPosts() {
        return new Promise<[PostModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._posts, 10]);
                }
            }, 700);
        });
    }

    getPostBySlug(slug:string) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    getTagBySlug(slug:string) {
        return new Promise<TagModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._tags[0]);
                }
            }, 700);
        });
    }

    createPost(values: PostFormValues) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    updatePost(postId:number, values: PostFormValues) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    managePost(postId:number, values: {status: PostStatus }) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    
    getUsers() {
        return new Promise<[UserModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._users, 24]);
                }
            }, 700);
        });
    }

    updateUser(userId: number, values: UserFormValues) {
        return new Promise<UserModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._users[0]);
                }
            }, 700);
        });
    }

    test() {
        console.log('testing...');
    }

}