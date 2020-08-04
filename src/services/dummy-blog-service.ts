import PostModel from "../types/PostModel";
import { BlogServiceInterface } from "./types"

export default class DummyBlogService implements BlogServiceInterface {

    _posts: PostModel[] = [
        { id: 1, title: 'Dummy first post', slug: 'slug1', content: 'We open a blog first time' },
        { id: 2, title: 'Dummy second post', slug: 'slug2', content: 'My second post is better than first' }
    ]

    getPosts() {
        return new Promise<PostModel[]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts);
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

    test() {
        console.log('testing...');
    }

}