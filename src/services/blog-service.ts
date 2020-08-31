import { BlogServiceInterface,UserFormValues } from "./types";
import { authFetch } from "./fetch";
import { PostFormValues } from "../components/post/post-form/post-form"
import { PostStatus } from "../types/PostModel";

export default class BlogService implements BlogServiceInterface {

  _apiBase = process.env.REACT_APP_API_URL;

  protected getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getPosts = async () => {
    const res = await this.getResource(`/posts/`);
    return res.posts;
  };

  getAllPosts = async () => {
    const res = await authFetch.get(`/backend/posts`);
    return res.data.posts
  };

  getPostBySlug = async (slug: string) => {
    const res = await this.getResource(`/posts/${slug}`);
    return res.post;
  }

  getResourcePost = async (slug: string) => {
    const url = `${this._apiBase}/posts`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: slug,
    };

    const jsonData = fetch(url, params).then((res) => {
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
      return res.json();
    });

    return jsonData;
  };

  createPost = async (values: PostFormValues) => {
    const res = await authFetch.post('/posts', values);
    return res.data
  }

  updatePost = async (postId:number , values: PostFormValues) => {
    const res = await authFetch.patch(`/posts/${postId}`, values);
    return res.data
  }

  managePost =  async (postId:number, values: {status:PostStatus}) => {
    const res = await authFetch.patch(`/backend/posts/${postId}`, values);
    return res.data
  };

  getUsers = async () => {
    const res = await authFetch.get(`/users`);
    return res.data.users
  }

  updateUser = async (userId:number, values:UserFormValues) => {
    const res = await authFetch.patch(`/users/${userId}`, values);
    return res.data
  }

  test() {
    console.log("testing...");
  }
}
