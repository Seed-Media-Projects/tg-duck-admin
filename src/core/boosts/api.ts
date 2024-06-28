import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AX } from '../data/fetcher';
import { BoostItem, SaveBoost } from './types';

export const getBoostsFX = createEffect(async () => {
  const { data } = await AX.get<BoostItem[]>('/admin/api/boost');

  return data;
});

export const deleteBoostFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/boost/${id}`);
});
export const changePositionBoostFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AX.post('/admin/api/boost/position', { positions });
});

export const getBoostFX = createEffect(async (id: number) => {
  const { data } = await AX.get<BoostItem>(`/admin/api/boost/${id}`);

  return data;
});
export const updateBoostFX = createEffect(async ({ id, ...payload }: { id: number } & SaveBoost) => {
  await AX.put(`/admin/api/boost/${id}`, payload);
});
export const createBoostFX = createEffect(async (payload: SaveBoost) => {
  await AX.post('/admin/api/boost', payload);
});
