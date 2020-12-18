import React, { useCallback, useMemo, useRef } from "react";
import { DEFAULT_DATA_URL_KEY } from "./consts";
import { ImageUploadInterface } from "./typings";
import { getAcceptTypeString, getListFiles, openFileDialog } from "./utils";

const ImageUpload: React.FC<ImageUploadInterface> = ({
  name = 'file',
  value = [],
  onChange,
  children,
  acceptType,
  dataURLKey = DEFAULT_DATA_URL_KEY,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = useCallback(() => openFileDialog(inputRef), [
    inputRef,
  ]);

  const onImageUpload = useCallback((): void => {
    handleClickInput();
  }, [handleClickInput]);

  const acceptTypeString = useMemo(() => getAcceptTypeString(acceptType), [
    acceptType,
  ]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileList = await getListFiles(files, dataURLKey);
    if (!fileList.length) return;

    onChange(fileList);
  };

  return (
    <>
      <input
        name={name}
        type="file"
        accept={acceptTypeString}
        ref={inputRef}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      {children?.({
        imageList: value,
        onImageUpload,
      })}
    </>
  );
};

export default ImageUpload;
