import { createEffect } from 'effector';
import { AXPRICE } from '../data/fetcher';
import { PricemeLast24hUsersCount, PricemeUsersBoostCount, PricemeUsersCount } from './types';

export const getUsersCountFX = createEffect(async () => {
  const { data } = await AXPRICE.get<PricemeUsersCount>('/admin/api/dashboard/users/count');

  return data;
});
export const getLast24hUsersCountFX = createEffect(async () => {
  const { data } = await AXPRICE.get<PricemeLast24hUsersCount>('/admin/api/dashboard/users/count/active');

  return data;
});
export const getUsersBoostCountFX = createEffect(async () => {
  const { data } = await AXPRICE.get<PricemeUsersBoostCount>('/admin/api/dashboard/users/count/boost');

  return data;
});
