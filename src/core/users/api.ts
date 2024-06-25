import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { UserListItem } from './types';

export const getUsersListFX = createEffect(async (offset: number) => {
  const { data } = await AX.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset,
    },
  });

  return data;
});
