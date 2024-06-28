import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { SaveUpgradeLvl, UpgradeLvlItem } from './types';

export const getUpgradeLvlsFX = createEffect(async (upgradeId: number) => {
  const { data } = await AX.get<UpgradeLvlItem[]>(`/admin/api/upgrade/${upgradeId}/lvl`);

  return data;
});

export const deleteUpgradeLvlFX = createEffect(async ({ id, upgradeId }: { id: number; upgradeId: number }) => {
  await AX.delete(`/admin/api/upgrade/${upgradeId}/lvl/${id}`);
});

export const getUpgradeLvlFX = createEffect(async ({ id, upgradeId }: { id: number; upgradeId: number }) => {
  const { data } = await AX.get<UpgradeLvlItem>(`/admin/api/upgrade/${upgradeId}/lvl/${id}`);

  return data;
});
export const updateUpgradeLvlFX = createEffect(
  async ({ id, upgradeId, ...payload }: { id: number; upgradeId: number } & SaveUpgradeLvl) => {
    await AX.put(`/admin/api/upgrade/${upgradeId}/lvl/${id}`, payload);
  },
);
export const createUpgradeLvlFX = createEffect(async ({ upgradeId, ...payload }: { upgradeId: number } & SaveUpgradeLvl) => {
  await AX.post(`/admin/api/upgrade/${upgradeId}/lvl`, payload);
});
