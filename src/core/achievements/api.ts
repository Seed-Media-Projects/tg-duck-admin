import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { AchievementItem } from './types';

export const getAchievementsFX = createEffect(async () => {
  const { data } = await AX.get<AchievementItem[]>('/admin/api/achievement');

  return data;
});

export const deleteAchievementFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/achievement/${id}`);
});
