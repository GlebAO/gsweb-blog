import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";
import { EntitiesContainer } from "../../containers";
import PostsListLayout from "../post/posts-list-layout";
import PostsList from "../../components/post/posts-list";
import config from "../../config";
import { Helmet } from "react-helmet";
//import { entityItemsApplyFilter } from "../../actions/entities/actions";

interface MatchParams {
  slug: string;
}

const TagPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  let tagPageTitle:string|null = null;
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const { slug } = match.params;

  useEffect(() => {
    if (blogService) {
      stableDispatch(
        fetchDetailedEntityItem("tags", slug, () =>
          blogService.getTagBySlug(slug)
        )
      );
    }
  }, [stableDispatch, blogService, slug]);

  const initialFilter = useMemo(() => ({tag: slug}), [slug])

 // useEffect(() => {
   // stableDispatch(entityItemsApplyFilter(config.entities.PUBLIC_POSTS_FOR_TAG(slug), {tag: slug}))
  //}, [stableDispatch, slug])

  const {
    detailedEntities: { tags },
  } = state;

  const getTagTitle = () => {
    if(tagPageTitle) {
      return tagPageTitle;
    }

    let tagTitle = slug;
    if (tags) {
      const tag = tags[slug];
      if (tag && tag.item) {
        tagTitle = tag.item.title;
      }
    }
    return tagTitle[0].toUpperCase() + tagTitle.slice(1);
  };

  return (
    <>
    <Helmet>
  <title>{getTagTitle()} в блоге GSweb - полезные примеры кода и обсуждения в статьях с тэгом {getTagTitle()}.</title>
        <meta
          name="description"
          content={`Статьи с тегом ${getTagTitle()} - полезные примеры кода с подробным описанием и обсуждением.`}
        />
      </Helmet>
    <div className="tag-page">
      <h1>{getTagTitle()}</h1>
      <PostsListLayout
        left={null}
        center={
          <EntitiesContainer
            entityKey={config.entities.PUBLIC_POSTS_FOR_TAG(slug)}
            endpoint={blogService!.getPosts}
            initialFilter={initialFilter}
          >
            {(items) => <PostsList posts={items} />}
          </EntitiesContainer>
        }
        right={null}
      />
    </div>
    </>
  );
};

export default TagPage;
