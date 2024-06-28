import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { SaveUpgrade, UpgradeItem } from './types';

export const getUpgradesFX = createEffect(async () => {
  const { data } = await AX.get<UpgradeItem[]>('/admin/api/upgrade');

  return data;
});

export const deleteUpgradeFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/upgrade/${id}`);
});

export const getUpgradeFX = createEffect(async (id: number) => {
  const { data } = await AX.get<UpgradeItem>(`/admin/api/upgrade/${id}`);

  return data;
});
export const updateUpgradeFX = createEffect(async ({ id, ...payload }: { id: number } & SaveUpgrade) => {
  await AX.put(`/admin/api/upgrade/${id}`, payload);
});
export const createUpgradeFX = createEffect(async (payload: SaveUpgrade) => {
  await AX.post('/admin/api/upgrade', payload);
});
