import React from "react";
import { Link } from "react-router-dom";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Link to={url} className="btn btn-link">
      <FontAwesomeIcon icon={faPencilAlt} />
    </Link>
  );
};

export default EditButton;
