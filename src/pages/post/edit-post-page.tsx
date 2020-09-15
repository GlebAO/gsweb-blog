import React from "react";
import { RouteComponentProps } from "react-router";
import { EditPostContainer } from "../../containers";

interface MatchParams {
  slug: string;
}

const EditPostPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { slug } = match.params;
  return (
    <div className="create-post-page">
      <h1 className="mb-3">Редактирование записи</h1>
      <div className=" row">
        <div className="col-md-9">
          <div className="card">
            <div className="gs-post-form">
              <EditPostContainer slug={slug} />
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default EditPostPage;
