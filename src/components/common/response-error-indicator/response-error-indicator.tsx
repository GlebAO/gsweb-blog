import React from "react";
import { Redirect } from "react-router-dom";
import { ResponseError } from "../../../reducers/types";
import { FormAlert } from "../../form";

const ResponseErrorIndicator: React.FC<{ error: ResponseError }> = ({
  error,
}) => {
   // console.log(error.status);

  switch (error.status) {
    case 500:
        return <FormAlert text={error.message} success={false} />;
    case 404:
      return <Redirect to="/404" />;
    case 403:
      return <FormAlert text={error.message} success={false} />;
    default:
      return <span>Something bad happened</span>
  }
};

export default ResponseErrorIndicator;
