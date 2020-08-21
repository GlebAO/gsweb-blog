import React from "react";
import { CreatePostContainer } from "../../containers";

const CreatePostPage = () => {
  return (
    <div className="create-post-page">
      <h1 className="mb-3">Добавление новой записи</h1>
      <div className=" row">
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <CreatePostContainer />
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default CreatePostPage;
