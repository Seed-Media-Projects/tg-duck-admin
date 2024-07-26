import { createEffect } from 'effector';
import { AXDUCK } from '../data/fetcher';
import { MarketLvlItem, SaveMarketLvl } from './types';

export const getMarketLvlsFX = createEffect(async (marketId: number) => {
  const { data } = await AXDUCK.get<MarketLvlItem[]>(`/admin/api/market/${marketId}/lvl`);

  return data;
});

export const deleteMarketLvlFX = createEffect(async ({ id, marketId }: { id: number; marketId: number }) => {
  await AXDUCK.delete(`/admin/api/market/${marketId}/lvl/${id}`);
});

export const getMarketLvlFX = createEffect(async ({ id, marketId }: { id: number; marketId: number }) => {
  const { data } = await AXDUCK.get<MarketLvlItem>(`/admin/api/market/${marketId}/lvl/${id}`);

  return data;
});
export const updateMarketLvlFX = createEffect(
  async ({ id, marketId, ...payload }: { id: number; marketId: number } & SaveMarketLvl) => {
    await AXDUCK.put(`/admin/api/market/${marketId}/lvl/${id}`, payload);
  },
);
export const createMarketLvlFX = createEffect(async ({ marketId, ...payload }: { marketId: number } & SaveMarketLvl) => {
  await AXDUCK.post(`/admin/api/market/${marketId}/lvl`, payload);
});
