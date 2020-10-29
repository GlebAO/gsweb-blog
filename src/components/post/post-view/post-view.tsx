import React, { useContext } from "react";
import PostModel from "../../../types/PostModel";
import DOMpurify from "dompurify";
import { AppContext } from "../../../reducers";
import Prism from "prismjs";
import ReactMarkdown from "react-markdown/with-html";
import PostTags from "../../tags/post-tags";
import PostManageToolbar from "../post-manage-toolbar";
import { CommentsContainer } from "../../../containers";
import { CommentTypes } from "../../../types/CommentModel";
import PublishMeta from "../../common/publish-meta";

import "./post-view.scss";
import "../../../assets/css/prism.css";
//import "react-markdown-editor-lite/lib/index.css";

interface PostViewProps {
  post: PostModel;
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const { isPostAuthor } = useContext(AppContext);
  const {
    id,
    title,
    content,
    userId,
    slug,
    user,
    createdAt,
    tags,
    status,
  } = post;

  const renderContent = (content: string | undefined) => {
    if (content) {
      // XSS test
      // return (
      //   <div
      //     className="post-content-body"
      //     dangerouslySetInnerHTML={{ __html: content }}
      //   />
      // )
      const CodeSnippet:React.FC<{content:any, language:string}> = ({content, language}) => {
        return (
          <pre className={`language-${language}`}>
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  content,
                  Prism.languages[language],
                  language
                ),
              }}
            />
          </pre>
        );
      };

      const prizmCode = (props: any) => {
        let language = "javascript";
        return <CodeSnippet language={language} content={props.value} />;
      };

      const renderers = {
        code: prizmCode,
      };

      return (
        <div className="post-content">
          <ReactMarkdown
            //source={DOMpurify.sanitize(content)}
            renderers={renderers}
            disallowedTypes={["heading", "html", "link"]}
            unwrapDisallowed={true}
            children={content}
            //allowDangerousHtml={true}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="card post-view mb-3">
        <div className="position-relative">
          {isPostAuthor(userId) && (
            <PostManageToolbar status={status} slug={slug} />
          )}

          <div className="card-body p-md-5">
            <PublishMeta meta={{ user, createdAt }} />
            <h1 className="font-weight-bold mb-3">{title}</h1>
            <div className="mb-3">
              {tags && <PostTags tags={tags} postId={id} />}
            </div>
            {renderContent(content)}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="mb-1">
            <strong>Комментарии:</strong>
          </div>
          <CommentsContainer
            commentableType={CommentTypes.POST}
            commentableId={id}
          />
        </div>
      </div>
    </>
  );
};

export default PostView;
