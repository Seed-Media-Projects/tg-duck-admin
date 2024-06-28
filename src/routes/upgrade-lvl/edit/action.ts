import { SaveUpgradeLvl, updateUpgradeLvlFX } from '@core/upgrade-lvls';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateUpgradeLvlAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveUpgradeLvl;

  try {
    await updateUpgradeLvlFX({
      ...payload,
      upgradeId: Number(params.upgradeId),
      price: Number(payload.price),
      increaseAmount: Number(payload.increaseAmount),
      lvl: Number(payload.lvl),
      id: Number(params.lvlId),
    });
  } catch (error) {
    return {
      error: 'Cannot update upgrade lvl',
    };
  }

  return redirect(`/upgrades/${params.upgradeId}/lvls`);
};
