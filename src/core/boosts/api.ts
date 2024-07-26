import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AXDUCK } from '../data/fetcher';
import { BoostItem, SaveBoost } from './types';

export const getBoostsFX = createEffect(async () => {
  const { data } = await AXDUCK.get<BoostItem[]>('/admin/api/boost');

  return data;
});

export const deleteBoostFX = createEffect(async (id: number) => {
  await AXDUCK.delete(`/admin/api/boost/${id}`);
});
export const changePositionBoostFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AXDUCK.post('/admin/api/boost/position', { positions });
});

export const getBoostFX = createEffect(async (id: number) => {
  const { data } = await AXDUCK.get<BoostItem>(`/admin/api/boost/${id}`);

  return data;
});
export const updateBoostFX = createEffect(async ({ id, ...payload }: { id: number } & SaveBoost) => {
  await AXDUCK.put(`/admin/api/boost/${id}`, payload);
});
export const createBoostFX = createEffect(async (payload: SaveBoost) => {
  await AXDUCK.post('/admin/api/boost', payload);
});
