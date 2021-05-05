import React, { useContext } from "react";
import { EntitiesContainer } from "../../containers";
import { TagsListContainer } from "../../containers";
import PostsListLayout from "./posts-list-layout";
import { BlogServiceContext } from "../../context";
import config from "../../config";
import PostsList from "../../components/post/posts-list";
import { Helmet } from "react-helmet";

const Banner = () => {
  return (
    <div className="banner">
      <div className="mb-2">
        <span>О проекте</span>
      </div>
      <div className="card bg-light">
        <div className="card-body">
          <p className="lead">Блог GSweb</p>
          <ul className="list-unstyled">
            <li>
              Telegram: <a href="tg://resolve?domain=glebao">GlebAO</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const PostsPage = () => {
  const blogService = useContext(BlogServiceContext);
  return (
    <>
      <Helmet>
        <title>GSweb - блог о веб-разработке c интересными материалами и обсуждениями о Javascript, Typescript, React, Koa, Serverless и многое другое. </title>
        <meta
          name="description"
          content='Полезные примеры кода с подробным описанием на популярные темы в среде веб-разработчиков. Статьи о JavaScript, TypeScript, React, Koa, Frontend, Backend.'
        />
      </Helmet>
      <PostsListLayout
        left={<TagsListContainer />}
        center={
          <>
            <strong className="mb-2 d-block">Записи:</strong>
            <EntitiesContainer
              entityKey={config.entities.PUBLIC_POSTS}
              endpoint={blogService!.getPosts}
            >
              {(items) => <PostsList posts={items} />}
            </EntitiesContainer>
          </>
        }
        right={<Banner />}
      />
    </>
  );
};

export default PostsPage;
