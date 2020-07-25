import { BlogServiceInterface } from "./types";

export default class BlogService implements BlogServiceInterface {

  _apiBase = 'http://192.168.20.160:3000/';

  protected getResource = async (url:string) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  getPosts = async() => {
    const res = await this.getResource(`/posts/`);
    return res.posts;
  }

  test() {
    console.log('testing...');
  }
}