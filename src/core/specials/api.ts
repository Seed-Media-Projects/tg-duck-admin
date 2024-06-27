import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AX } from '../data/fetcher';
import { SaveSpecial, SpecialItem } from './types';

export const getSpecialsFX = createEffect(async () => {
  const { data } = await AX.get<SpecialItem[]>('/admin/api/special');

  return data;
});

export const deleteSpecialFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/special/${id}`);
});
export const changePositionSpecialFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AX.post('/admin/api/special/position', { positions });
});

export const getSpecialFX = createEffect(async (id: number) => {
  const { data } = await AX.get<SpecialItem>(`/admin/api/special/${id}`);

  return data;
});
export const updateSpecialFX = createEffect(async ({ id, ...payload }: { id: number } & SaveSpecial) => {
  await AX.put(`/admin/api/special/${id}`, payload);
});
export const createSpecialFX = createEffect(async (payload: SaveSpecial) => {
  await AX.post('/admin/api/special', payload);
});
