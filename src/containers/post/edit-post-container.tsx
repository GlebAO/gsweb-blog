import React, { useContext, useCallback, useEffect } from "react";
import PostForm from "../../components/post/post-form";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";
import { Spinner } from "../../components/common/spinner";
import ErrorIndicator from "../../components/common/error-indicator";

interface EditPostContainerProps {
    slug: string
}

const EditPostContainer:React.FC<EditPostContainerProps> = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchDetailedEntityItem("posts", slug, () => blogService.getPostBySlug(slug)));
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
    return <ErrorIndicator />;
  }

  if (postData) {
    const { id, title, slug, content = '', tags } = postData;
    return <PostForm initialValues={{ id, title, slug, content, tags }} />;
  }

  return <PostForm />;
};

export default EditPostContainer;
