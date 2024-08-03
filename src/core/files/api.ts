import { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createEffect } from 'effector';
import { AXDUCK, AXPRICE } from '../data/fetcher';
import { FileInfo } from './types';

type ParamsConfig = {
  file: File;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  from: 'ducky' | 'priceme';
};

export const uploadFileFX = createEffect(async (config: ParamsConfig) => {
  const fileInfo = await fileUploadOnDrop(config);

  return fileInfo;
});

const fileUploadOnDrop = async ({ file, onUploadProgress, from }: ParamsConfig) => {
  const formData = new FormData();
  formData.append('file', file);

  let axTarget:
    | ((url: string, data?: FormData, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<FileInfo>>)
    | null = null;

  switch (from) {
    case 'priceme':
      axTarget = AXPRICE.post<FileInfo>;
      break;

    default:
      axTarget = AXDUCK.post<FileInfo>;
      break;
  }

  const { data } = await axTarget(`/admin/api/filestorage/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });

  return data;
};
