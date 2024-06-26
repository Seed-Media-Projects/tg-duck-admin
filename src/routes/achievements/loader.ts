import { getAchievementsFX } from '../../core/achievements';

export const achievementsLoader = async () => {
  const achievements = await getAchievementsFX();
  return { achievements };
};
