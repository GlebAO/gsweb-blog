import { BlogServiceInterface, UserFormValues, EntityWithTotal } from "./types";
import { authFetch } from "./fetch";
import { PostFormValues } from "../components/post/post-form/post-form"
import PostModel, { PostStatus } from "../types/PostModel";
import UserModel from "../types/UserModel";
import config from "../config";
import { AxiosResponse } from "axios";
import TagModel from "../types/TagModel";
import { FilterObjectInterface } from "../reducers/types";
import { CommentsFormValuesInterface } from "../components/comments/comments-form";
import CommentModel from "../types/CommentModel";

class ResponseError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default class BlogService implements BlogServiceInterface {

  _apiBase = process.env.REACT_APP_API_URL;

  protected getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);
    
    if (!res.ok && res.status >= 500) {
      throw new ResponseError("Возникли проблемы на стороне сервера. Повторите запрос позже.", res.status);
    }
    const json = await res.json();
    if (!res.ok) {
      throw new ResponseError(json.error && json.error.message ? json.error.message : `Запрос ${res.url} завершился со статусом ${res.status}.`, res.status);
    }
    return json; 
  };

  getPosts = async (page = 1, perPage = config.PER_PAGE, filter: FilterObjectInterface | undefined = undefined): Promise<EntityWithTotal<PostModel>> => {
    let url = `/posts/?page=${page}&perPage=${perPage}`;
    
    if(filter !== undefined && typeof filter === "object") {
      const str = Object.keys(filter).map((key:string) => `${key}=${filter[key]}`).join("&");
      url += '&'+str;
    }
    const res = await this.getResource(url);
    return res.posts;
  };

  getOwnPosts = async (page = 1, perPage = config.PER_PAGE) : Promise<EntityWithTotal<PostModel>> => {
    let url = `/my-posts?page=${page}&perPage=${perPage}`;
    const res = await this.getResource(url);
    return res.posts;
  }

  getComments = async (commentableId: string | number, commentabletype: string, page = 1, perPage = config.PER_PAGE) : Promise<EntityWithTotal<CommentModel>> => {
    let url = `/comments?commentableId=${commentableId}&commentabletype=${commentabletype}&page=${page}&perPage=${perPage}`;
    const res = await this.getResource(url);
    return res.comments;
  }

  getTags = async (page = 1, perPage = config.PER_PAGE): Promise<EntityWithTotal<TagModel>> => {
    const res = await this.getResource(`/tags/?page=${page}&perPage=${perPage}`);
    return res.tags;
  }

  getTagBySlug = async (slug: string) => {
    const res = await this.getResource(`/tags/${slug}`);
    return res.tag;
  }

  updateTag = async (tag: TagModel) => {
    const res = await authFetch.patch(`/tags/${tag.id}`, tag);
    return res.data.tag
  }

  updateTagLogo = async (formData: FormData, tagId:number) => {
    const res = await authFetch.patch(`/tags/${tagId}/logo`, formData);
    return res.data.tag
  }

  getAllPosts = async (page = 1, perPage = config.PER_PAGE): Promise<EntityWithTotal<PostModel>> => {
    const res = await authFetch.get(`/backend/posts?page=${page}`);
    return res.data.posts;
  };

  getAllComments = async (page = 1, perPage = config.PER_PAGE): Promise<EntityWithTotal<CommentModel>> => {
    const res = await authFetch.get(`/comments/all?page=${page}`);
    return res.data.comments
  }

  getPostBySlug = async (slug: string) => {
    const res = await this.getResource(`/posts/${slug}`);
    return res.post;
  }

  getOwnPostBySlug = async (slug: string) => {
    const res = await authFetch.get(`/posts/own/${slug}`);
    return res.data.post;
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
    return res.data.post
  }

  createComment = async (values: CommentsFormValuesInterface) => {
    const res = await authFetch.post(`/comments/${values.commentableId}`, values);
    return res.data.comment
  }

  updateComment = async (id: number, content: string) => {
    const res = await authFetch.patch(`/comments/${id}`, {content});
    return res.data.comment
  }

  deleteComment = async (id: number) => {
    const res = await authFetch.delete(`/comments/${id}`);
    return res.data.deleted
  }

  updatePost = async (postId: number, values: PostFormValues) => {
    const res = await authFetch.patch(`/posts/${postId}`, values);
    return res.data.post
  }

  managePost = async (postId: number, values: { status: PostStatus }) => {
    const res = await authFetch.patch(`/backend/posts/${postId}`, values);
    return res.data.post
  };

  getUsers = async (page = 1, perPage = config.PER_PAGE) => {
    const res = await authFetch.get<string, AxiosResponse<{ users: EntityWithTotal<UserModel> }>>(`/users/?page=${page}`);
    return res.data.users
  }

  updateUser = async (userId: number, values: UserFormValues) => {
    const res = await authFetch.patch(`/users/${userId}`, values);
    return res.data
  }

  async updateSitemap() {
    const res = await authFetch.get('/sitemap');
    return res.data
  }

  test() {
    console.log("testing...");
  }
}
