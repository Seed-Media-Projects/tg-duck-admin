import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AX } from '../data/fetcher';
import { MarketItem, SaveMarket } from './types';

export const getMarketsFX = createEffect(async () => {
  const { data } = await AX.get<MarketItem[]>('/admin/api/market');

  return data;
});

export const deleteMarketFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/market/${id}`);
});
export const changePositionMarketFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AX.post('/admin/api/market/position', { positions });
});

export const getMarketFX = createEffect(async (id: number) => {
  const { data } = await AX.get<MarketItem>(`/admin/api/market/${id}`);

  return data;
});
export const updateMarketFX = createEffect(async ({ id, ...payload }: { id: number } & SaveMarket) => {
  await AX.put(`/admin/api/market/${id}`, payload);
});
export const createMarketFX = createEffect(async (payload: SaveMarket) => {
  await AX.post('/admin/api/market', payload);
});
