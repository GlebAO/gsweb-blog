import {
  faInfoCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { PostStatus } from "../../../types/PostModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostStatusIndicator: React.FC<{ status: PostStatus }> = ({ status }) => {

  function renderSpan(
    classes: string,
    hint: string,
    icon: IconDefinition,
    text: string
  ) {
    return (
      <span className={classes} title={hint}>
        {" "}
        <FontAwesomeIcon icon={icon} /> {text}
      </span>
    );
  }

  return (
    <div>
      {status === PostStatus.ACTIVE &&
        renderSpan("text-success", "Виден всем", faInfoCircle, "Опубликовано")}
      {status === PostStatus.DRAFT &&
        renderSpan(
          "text-secondary",
          "Виден только Вам",
          faInfoCircle,
          "Черновик"
        )}
      {status === PostStatus.PENDING &&
        renderSpan(
          "text-warning",
          "После проверки станет виден Всем",
          faInfoCircle,
          "На модерации"
        )}
    </div>
  );
};

export default PostStatusIndicator;
