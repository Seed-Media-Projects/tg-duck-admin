import { AxiosProgressEvent } from 'axios';
import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { FileInfo } from './types';

export const uploadFileFX = createEffect(
  async ({ file, onUploadProgress }: { file: File; onUploadProgress?: (progressEvent: AxiosProgressEvent) => void }) => {
    const fileInfo = await fileUploadOnDrop(file, onUploadProgress);

    return fileInfo;
  },
);

const fileUploadOnDrop = async (file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await AX.post<FileInfo>(`/admin/api/filestorage/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });

  return data;
};
