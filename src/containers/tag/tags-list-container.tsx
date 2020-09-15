import React, { useContext, useCallback, useEffect } from "react";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchEntityItems } from "../../actions/entities/actions";
import TagsMenu from "../../components/tags/tags-menu";
import { Spinner } from "../../components/common/spinner";

const TagsListContainer = () => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const {
    entities: { publicTags },
  } = state;
  const page = publicTags ? publicTags.page : 1;

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchEntityItems("publicTags", blogService.getTags, page));
    }
  }, [stableDispatch, blogService, page]);

  if (!publicTags) {
    return null;
  }

  const { items: tags, loading, error, total } = publicTags;

  if (error) {
    return <p>Error</p>;
  }

  if (total === 0) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-2">
        <span className="text-secondary text-uppercase">Тэги:</span>
      </div>
      <TagsMenu tags={tags} />
    </div>
  );
};

export default TagsListContainer;
