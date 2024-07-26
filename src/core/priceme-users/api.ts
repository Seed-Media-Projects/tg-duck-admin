import { createEffect } from 'effector';
import { AXPRICE } from '../data/fetcher';
import { UpdateUserData, UserInfo, UserListItem } from './types';

export const initGetPricemeUsersListFX = createEffect(async () => {
  const { data } = await AXPRICE.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset: 0,
    },
  });

  return data;
});
export const getPricemeUsersListFX = createEffect(async (offset: number) => {
  const { data } = await AXPRICE.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset,
    },
  });

  return data;
});

export const getPricemeUserDataFX = createEffect(async (userId: number) => {
  const { data } = await AXPRICE.get<UserInfo>(`/admin/api/user/${userId}`);

  return data;
});
export const updatePricemeUserDataFX = createEffect(async ({ id, ...payload }: UpdateUserData) => {
  await AXPRICE.put(`/admin/api/user/${id}`, payload);
});
export const resetPricemeUserDataFX = createEffect(async (userId: number) => {
  await AXPRICE.delete(`/admin/api/user/${userId}`);
});
