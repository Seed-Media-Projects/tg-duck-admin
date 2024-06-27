import { LoaderFunctionArgs } from 'react-router-dom';
import { getAchievementFX } from '../../../core/achievements';

export const achievementLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.aId) {
    return { achievement: null };
  }

  const achievement = await getAchievementFX(Number(params.aId));
  return { achievement };
};
