import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { UpdateUserData, updateUserDataFX } from '../../../core/users';

export const updateUserAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as unknown as UpdateUserData;

  try {
    await updateUserDataFX({
      ...updates,
      id: Number(params.userId),

      betCoins: Number(updates.betCoins),
      coins: Number(updates.coins),
      coinsPerTap: Number(updates.coinsPerTap),
      energy: Number(updates.energy),
      experience: Number(updates.experience),
      incomePerHour: Number(updates.incomePerHour),
      maxEnergy: Number(updates.maxEnergy),
      maxReferrals: Number(updates.maxReferrals),
    });
  } catch (error) {
    return {
      error: 'Cannot save user',
    };
  }

  return redirect(`/users/${params.userId}`);
};
