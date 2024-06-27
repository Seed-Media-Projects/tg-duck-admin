import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AX } from '../data/fetcher';
import { AchievementItem, SaveAchievement } from './types';

export const getAchievementsFX = createEffect(async () => {
  const { data } = await AX.get<AchievementItem[]>('/admin/api/achievement');

  return data;
});

export const deleteAchievementFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/achievement/${id}`);
});
export const changePositionAchievementFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AX.post('/admin/api/achievement/position', { positions });
});

export const getAchievementFX = createEffect(async (id: number) => {
  const { data } = await AX.get<AchievementItem>(`/admin/api/achievement/${id}`);

  return data;
});
export const updateAchievementFX = createEffect(async ({ id, ...payload }: { id: number } & SaveAchievement) => {
  await AX.put(`/admin/api/achievement/${id}`, payload);
});
export const createAchievementFX = createEffect(async (payload: SaveAchievement) => {
  await AX.post('/admin/api/achievement', payload);
});
