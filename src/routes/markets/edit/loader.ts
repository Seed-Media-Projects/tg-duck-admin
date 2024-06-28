import { getMarketFX } from '@core/markets';
import { LoaderFunctionArgs } from 'react-router-dom';

export const marketLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.marketId) {
    return { market: null };
  }

  const market = await getMarketFX(Number(params.marketId));
  return { market };
};
