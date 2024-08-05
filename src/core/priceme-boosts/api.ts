import { createEffect } from 'effector';
import { AXPRICE } from '../data/fetcher';
import { PricemeBoostItem, SavePricemeBoost } from './types';

export const getPricemeBoostsFX = createEffect(async () => {
  const { data } = await AXPRICE.get<PricemeBoostItem[]>('/admin/api/boost');

  return data;
});

export const deletePricemeBoostFX = createEffect(async (id: number) => {
  await AXPRICE.delete(`/admin/api/boost/${id}`);
});

export const getPricemeBoostFX = createEffect(async (id: number) => {
  const { data } = await AXPRICE.get<PricemeBoostItem>(`/admin/api/boost/${id}`);

  return data;
});
export const updatePricemeBoostFX = createEffect(async ({ id, ...payload }: { id: number } & SavePricemeBoost) => {
  await AXPRICE.put(`/admin/api/boost/${id}`, payload);
});
export const createPricemeBoostFX = createEffect(async (payload: SavePricemeBoost) => {
  await AXPRICE.post('/admin/api/boost', payload);
});
