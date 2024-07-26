import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AXDUCK } from '../data/fetcher';
import { MarketItem, SaveMarket } from './types';

export const getMarketsFX = createEffect(async () => {
  const { data } = await AXDUCK.get<MarketItem[]>('/admin/api/market');

  return data;
});

export const deleteMarketFX = createEffect(async (id: number) => {
  await AXDUCK.delete(`/admin/api/market/${id}`);
});
export const changePositionMarketFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AXDUCK.post('/admin/api/market/position', { positions });
});

export const getMarketFX = createEffect(async (id: number) => {
  const { data } = await AXDUCK.get<MarketItem>(`/admin/api/market/${id}`);

  return data;
});
export const updateMarketFX = createEffect(async ({ id, ...payload }: { id: number } & SaveMarket) => {
  await AXDUCK.put(`/admin/api/market/${id}`, payload);
});
export const createMarketFX = createEffect(async (payload: SaveMarket) => {
  await AXDUCK.post('/admin/api/market', payload);
});
