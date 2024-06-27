import { getSpecialsFX } from '@core/specials';

export const specialsLoader = async () => {
  const specials = await getSpecialsFX();
  return { specials };
};
