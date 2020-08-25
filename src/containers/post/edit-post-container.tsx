import React, { useContext, useCallback, useEffect } from "react";
import PostForm from "../../components/post/post-form";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchPostBySlug } from "../../actions/postContent/actions";
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
      stableDispatch(fetchPostBySlug(slug, blogService));
    }
  }, [slug, stableDispatch, blogService]);

  const {
    postContent: { postData, loading, error },
  } = state;

  if(loading) {
      return <Spinner />
  }

  if(error) {
    return <ErrorIndicator />;
  }

  if (postData) {
    const { id, title, slug, content } = postData;
    return <PostForm initialValues={{ id, title, slug, content }} />;
  }

  return <PostForm />;
};

export default EditPostContainer;
