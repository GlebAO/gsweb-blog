import React, { useContext, useCallback, useEffect } from "react";
import PostForm from "../../components/post/post-form";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";
import { Spinner } from "../../components/common/spinner";
import ResponseErrorIndicator from "../../components/common/response-error-indicator";

interface EditPostContainerProps {
    slug: string
}

const EditPostContainer:React.FC<EditPostContainerProps> = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchDetailedEntityItem("posts", slug, () => blogService.getOwnPostBySlug(slug)));
    }
  }, [slug, stableDispatch, blogService]);

  const {
    detailedEntities: { posts },
  } = state;

  if(posts === undefined || posts[slug] === undefined) {
    return null
  }

  const {
     item:postData, loading, error
  } = posts[slug];

  if(loading) {
      return <Spinner />
  }

  if(error) {
    return <ResponseErrorIndicator error={error} />
  }

  if (postData) {
    const { id, title, slug, content = '', tags, status } = postData;
    return <PostForm initialValues={{ id, title, slug, content, tags, status }} />;
  }

  return <PostForm />;
};

export default EditPostContainer;
