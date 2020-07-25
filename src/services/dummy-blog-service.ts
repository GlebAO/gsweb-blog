import PostModel from "../types/PostModel";
import { BlogServiceInterface } from "./types"


export default class DummyService implements BlogServiceInterface {

    _posts: PostModel[] = [
        { id: 1, title: 'Dummy first post', content: 'We open a blog first time' },
        { id: 2, title: 'Dummy second post', content: 'My second post is better than first' }
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

    test() {
        console.log('testing...');
    }
}