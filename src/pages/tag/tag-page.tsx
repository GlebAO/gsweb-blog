import React, { useCallback, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";

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
        fetchDetailedEntityItem("tags", () => blogService.getTagBySlug(slug))
      );
    }
  }, [stableDispatch, blogService, slug]);

  const {
    detailedEntities: { tags },
  } = state;

  const getTagTitle = () => {
    let tagTitle = null;
    if (tags) {
      const tag = tags.find((tag) => tag.key === slug);
      if (tag) {
        tagTitle = tag.item.title;
      }
    }
    return tagTitle;
  };

  return (
    <div className="tag-page">
      <h1>{getTagTitle()}</h1>
    </div>
  );
};

export default TagPage;
