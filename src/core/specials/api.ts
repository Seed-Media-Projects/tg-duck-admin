import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AXDUCK } from '../data/fetcher';
import { SaveSpecial, SpecialItem } from './types';

export const getSpecialsFX = createEffect(async () => {
  const { data } = await AXDUCK.get<SpecialItem[]>('/admin/api/special');

  return data;
});

export const deleteSpecialFX = createEffect(async (id: number) => {
  await AXDUCK.delete(`/admin/api/special/${id}`);
});
export const changePositionSpecialFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AXDUCK.post('/admin/api/special/position', { positions });
});

export const getSpecialFX = createEffect(async (id: number) => {
  const { data } = await AXDUCK.get<SpecialItem>(`/admin/api/special/${id}`);

  return data;
});
export const updateSpecialFX = createEffect(async ({ id, ...payload }: { id: number } & SaveSpecial) => {
  await AXDUCK.put(`/admin/api/special/${id}`, payload);
});
export const createSpecialFX = createEffect(async (payload: SaveSpecial) => {
  await AXDUCK.post('/admin/api/special', payload);
});
