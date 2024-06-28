import { SaveUpgradeLvl, createUpgradeLvlFX } from '@core/upgrade-lvls';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createUpgradeLvlAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveUpgradeLvl;

  try {
    await createUpgradeLvlFX({
      ...payload,
      upgradeId: Number(params.upgradeId),
      price: Number(payload.price),
      increaseAmount: Number(payload.increaseAmount),
      lvl: Number(payload.lvl),
    });
  } catch (error) {
    return {
      error: 'Cannot create upgrade lvl',
    };
  }

  return redirect(`/upgrades/${params.upgradeId}/lvls`);
};
