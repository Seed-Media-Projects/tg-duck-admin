import { createEffect } from 'effector';
import { AXDUCK } from '../data/fetcher';
import { SaveUpgrade, UpgradeItem } from './types';

export const getUpgradesFX = createEffect(async () => {
  const { data } = await AXDUCK.get<UpgradeItem[]>('/admin/api/upgrade');

  return data;
});

export const deleteUpgradeFX = createEffect(async (id: number) => {
  await AXDUCK.delete(`/admin/api/upgrade/${id}`);
});

export const getUpgradeFX = createEffect(async (id: number) => {
  const { data } = await AXDUCK.get<UpgradeItem>(`/admin/api/upgrade/${id}`);

  return data;
});
export const updateUpgradeFX = createEffect(async ({ id, ...payload }: { id: number } & SaveUpgrade) => {
  await AXDUCK.put(`/admin/api/upgrade/${id}`, payload);
});
export const createUpgradeFX = createEffect(async (payload: SaveUpgrade) => {
  await AXDUCK.post('/admin/api/upgrade', payload);
});
