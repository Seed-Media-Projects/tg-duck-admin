import { SaveUpgrade, updateUpgradeFX } from '@core/upgrades';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateUpgradeAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveUpgrade;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateUpgradeFX({
      ...payload,
      fileId: Number(payload.fileId),
      id: Number(params.upgradeId),
    });
  } catch (error) {
    return {
      error: 'Cannot update upgrade',
    };
  }

  return redirect('/upgrades');
};
