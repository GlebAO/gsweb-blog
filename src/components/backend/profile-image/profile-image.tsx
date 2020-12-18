import React, { useRef, useState } from "react";
import { useAppContext } from "../../../reducers";
import { authFetch } from "../../../services/fetch";
import ImageUpload from "../../common/image-upload";
import { ImageListType } from "../../common/image-upload/typings";

const ProfileImage = (): JSX.Element => {
  const { getUserInfo } = useAppContext();
  const { sub, imageUrl } = getUserInfo();
  const [image, setImage] = useState<ImageListType>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = async (imageList: ImageListType) => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    try {
      await authFetch.post(`/users/profile/${sub}`, formData);
      setImage(imageList);
    } catch (err) {
      console.log(err);
    }
  };

  const renderImage = (imageList: ImageListType) => {
    if (imageList.length > 0) {
      return <img src={imageList[0].dataURL} alt=""  />;
    }
    return imageUrl && <img src={`${process.env.REACT_APP_UPLOADS_DOMAIN}/avatars/${sub}/${imageUrl}`} alt="" />
  };

  return (
    <div>
      <form ref={formRef}>
        <ImageUpload
          name="profileImage"
          value={image}
          onChange={handleImageChange}
        >
          {({ onImageUpload, imageList }) => (
            <div className="profile-image">
              <div className="mb-3">{renderImage(imageList)}</div>
              <button
                type="button"
                onClick={onImageUpload}
                className="btn btn-secondary"
              >
                Добавить автарку
              </button>
            </div>
          )}
        </ImageUpload>
      </form>
    </div>
  );
};

export default ProfileImage;
