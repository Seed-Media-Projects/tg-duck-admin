import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { UpdateUserData, UserInfo, UserListItem } from './types';

export const initGetUsersListFX = createEffect(async () => {
  const { data } = await AX.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset: 0,
    },
  });

  return data;
});
export const getUsersListFX = createEffect(async (offset: number) => {
  const { data } = await AX.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset,
    },
  });

  return data;
});

export const getUserDataFX = createEffect(async (userId: number) => {
  const { data } = await AX.get<UserInfo>(`/admin/api/user/${userId}`);

  return data;
});
export const updateUserDataFX = createEffect(async ({ id, ...payload }: UpdateUserData) => {
  await AX.put(`/admin/api/user/${id}`, payload);
});
export const resetUserDataFX = createEffect(async (userId: number) => {
  await AX.delete(`/admin/api/user/${userId}`);
});
