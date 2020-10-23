import React, { useState } from "react";
import CommentModel, { CommentTypes } from "../../types/CommentModel";
import CommentsTreeItem from "./comments-tree-item";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./comments-tree.scss";

interface CommentsTreeInterface {
  items: CommentModel[];
}

const CommentsTreeBranch: React.FC<{ item: CommentModel }> = ({ item }) => {
  const [opened, setOpened] = useState(true);
  return (
    <div className="comment-tree-branch d-flex w-100" key={item.id}>
      <div className="comment-tree-collapse mb-2 p-1"  onClick={() => setOpened(!opened)}>
        <span
          className="comment-tree-collapse-btn px-1 text-center d-inline-block"
        >
            <span>
            <FontAwesomeIcon icon={opened ? faCaretDown : faCaretRight} />
          </span>
        </span>
        {!opened && (
          <span className="font-italic font-weight-lighter">
            {item.author.name} 
            {item.children && ` +${item.children.length} ответ(a,ов)`}{" "}
          </span>
        )}
      </div>
      {opened && (
        <div className="comment-and-children w-100">
          <CommentsTreeItem item={item} />
          {item.children && <CommentsTree key={item.id} items={item.children} />}
        </div>
      )}
    </div>
  );
};

const CommentsTree: React.FC<CommentsTreeInterface> = ({ items }) => {
  return (
    <>
      {items.map((item) => <CommentsTreeBranch key={item.id} item={{...item, commentableType: CommentTypes.POST}} />)}
    </>
  );
};

export default CommentsTree;
