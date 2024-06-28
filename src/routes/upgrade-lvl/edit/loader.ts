import { getUpgradeLvlFX } from '@core/upgrade-lvls';
import { LoaderFunctionArgs } from 'react-router-dom';

export const upgradeLvlLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.upgradeId || !params.lvlId) {
    return { upgradeLvl: null };
  }

  const upgradeLvl = await getUpgradeLvlFX({
    upgradeId: Number(params.upgradeId),
    id: Number(params.lvlId),
  });
  return { upgradeLvl };
};
