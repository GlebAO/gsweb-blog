import React from 'react'

export interface ImageType {
    dataURL?: string;
    file?: File;
    [key: string]: any;
}

export type ImageListType = Array<ImageType>;

export interface ImageUploadInterface {
    name: string,
    value: ImageListType;
    onChange: (value: ImageListType, addUpdatedIndex?: Array<number>) => void;
    children?: (props: ExportInterface) => React.ReactNode;
    acceptType?: Array<string>;
    dataURLKey?: string;
}

export interface ExportInterface {
    imageList: ImageListType;
    onImageUpload: () => void;
}