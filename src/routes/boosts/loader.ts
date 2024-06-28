import { getBoostsFX } from '@core/boosts';

export const boostsLoader = async () => {
  const boosts = await getBoostsFX();
  return { boosts };
};
