import { getUpgradesFX } from '@core/upgrades';

export const upgradesLoader = async () => {
  const upgrades = await getUpgradesFX();
  return { upgrades };
};
