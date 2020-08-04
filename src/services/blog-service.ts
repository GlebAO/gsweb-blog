import { BlogServiceInterface } from "./types";

export default class BlogService implements BlogServiceInterface {
  _apiBase = "http://192.168.20.160:3005";

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

  test() {
    console.log("testing...");
  }
}
