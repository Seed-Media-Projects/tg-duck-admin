import { getMarketsFX } from '@core/markets';

export const marketsLoader = async () => {
  const markets = await getMarketsFX();
  return { markets };
};
