import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AXPRICE } from '../data/fetcher';
import { PricemeTaskItem, SavePricemeTask } from './types';

export const getPricemeTasksFX = createEffect(async () => {
  const { data } = await AXPRICE.get<PricemeTaskItem[]>('/admin/api/task');

  return data;
});

export const deletePricemeTaskFX = createEffect(async (id: number) => {
  await AXPRICE.delete(`/admin/api/task/${id}`);
});
export const changePositionPricemeTaskFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AXPRICE.post('/admin/api/task/position', { positions });
});

export const getPricemeTaskFX = createEffect(async (id: number) => {
  const { data } = await AXPRICE.get<PricemeTaskItem>(`/admin/api/task/${id}`);

  return data;
});
export const updatePricemeTaskFX = createEffect(async ({ id, ...payload }: { id: number } & SavePricemeTask) => {
  await AXPRICE.put(`/admin/api/task/${id}`, payload);
});
export const createPricemeTaskFX = createEffect(async (payload: SavePricemeTask) => {
  await AXPRICE.post('/admin/api/task', payload);
});
