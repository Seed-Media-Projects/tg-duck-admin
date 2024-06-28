import { getUpgradeLvlsFX } from '@core/upgrade-lvls';
import { LoaderFunctionArgs } from 'react-router-dom';

export const upgradeLvlsLoader = async ({ params }: LoaderFunctionArgs) => {
  const upgradeLvls = await getUpgradeLvlsFX(Number(params.upgradeId));
  return { upgradeLvls };
};
