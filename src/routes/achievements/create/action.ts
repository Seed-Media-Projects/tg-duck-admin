import { SaveAchievement, createAchievementFX } from '@core/achievements';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createAchievementAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveAchievement;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createAchievementFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      rewardCoins: Number(payload.rewardCoins),
      rewardExperience: Number(payload.rewardExperience),
    });
  } catch (error) {
    return {
      error: 'Cannot create achievement',
    };
  }

  return redirect('/achievements');
};
