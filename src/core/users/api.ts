import { createEffect } from 'effector';
import { AXDUCK } from '../data/fetcher';
import { UpdateUserData, UserInfo, UserListItem } from './types';

export const initGetUsersListFX = createEffect(async () => {
  const { data } = await AXDUCK.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset: 0,
    },
  });

  return data;
});
export const getUsersListFX = createEffect(async (offset: number) => {
  const { data } = await AXDUCK.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset,
    },
  });

  return data;
});

export const getUserDataFX = createEffect(async (userId: number) => {
  const { data } = await AXDUCK.get<UserInfo>(`/admin/api/user/${userId}`);

  return data;
});
export const updateUserDataFX = createEffect(async ({ id, ...payload }: UpdateUserData) => {
  await AXDUCK.put(`/admin/api/user/${id}`, payload);
});
export const resetUserDataFX = createEffect(async (userId: number) => {
  await AXDUCK.delete(`/admin/api/user/${userId}`);
});
