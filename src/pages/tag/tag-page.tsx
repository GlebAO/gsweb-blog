import React, { useCallback, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";
import { PostsListContainer } from "../../containers";
import PostsListLayout from "../post/posts-list-layout";

interface MatchParams {
  slug: string;
}

const TagPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
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

  const {
    detailedEntities: { tags },
  } = state;

  const getTagTitle = () => {
    let tagTitle = null;
    if (tags) {
      const tag = tags[slug];
      if (tag && tag.item) {
        tagTitle = tag.item.title;
      }
    }
    return tagTitle;
  };

  return (
    <div className="tag-page">
      <h1>{getTagTitle()}</h1>
      <PostsListLayout
        left={null}
        center={<PostsListContainer tag={slug} entityKey={'publicPosts'} endpoint={blogService!.getPosts}/>}
        right={null}
      />
    </div>
  );
};

export default TagPage;
