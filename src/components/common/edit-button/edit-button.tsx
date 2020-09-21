import React from "react";
import { Link } from "react-router-dom";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton: React.FC<{ url: string, text?:string }> = ({ url, text }) => {
  return (
    <Link to={url} className="btn btn-sm btn-outline-secondary">
      <FontAwesomeIcon icon={faPencilAlt} /> <span className="d-none d-md-inline">{text}</span>
    </Link>
  );
};

export default EditButton;
