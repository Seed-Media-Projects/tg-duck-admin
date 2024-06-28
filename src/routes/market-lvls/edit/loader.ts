import { getMarketLvlFX } from '@core/market-lvls';
import { LoaderFunctionArgs } from 'react-router-dom';

export const marketLvlLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.marketId || !params.lvlId) {
    return { marketLvl: null };
  }

  const marketLvl = await getMarketLvlFX({
    marketId: Number(params.marketId),
    id: Number(params.lvlId),
  });
  return { marketLvl };
};
