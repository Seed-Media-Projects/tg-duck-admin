import { getPricemeBoostsFX } from '@core/priceme-boosts';

export const boostsLoader = async () => {
  const boosts = await getPricemeBoostsFX();
  return { boosts };
};
