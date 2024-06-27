import { SaveAchievement, updateAchievementFX } from '@core/achievements';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateAchievementAiection = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveAchievement;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateAchievementFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      rewardCoins: Number(payload.rewardCoins),
      rewardExperience: Number(payload.rewardExperience),
      id: Number(params.aId),
    });
  } catch (error) {
    return {
      error: 'Cannot update achievement',
    };
  }

  return redirect('/achievements');
};
