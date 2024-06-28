import { SaveUpgrade, createUpgradeFX } from '@core/upgrades';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createUpgradeAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveUpgrade;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createUpgradeFX({
      ...payload,
      fileId: Number(payload.fileId),
    });
  } catch (error) {
    return {
      error: 'Cannot create upgrade',
    };
  }

  return redirect('/upgrades');
};
