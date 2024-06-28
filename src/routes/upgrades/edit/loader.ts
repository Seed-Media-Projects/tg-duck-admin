import { getUpgradeFX } from '@core/upgrades';
import { LoaderFunctionArgs } from 'react-router-dom';

export const upgradeLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.upgradeId) {
    return { upgrade: null };
  }

  const upgrade = await getUpgradeFX(Number(params.upgradeId));
  return { upgrade };
};
