import { getMarketLvlsFX } from '@core/market-lvls';
import { LoaderFunctionArgs } from 'react-router-dom';

export const marketLvlsLoader = async ({ params }: LoaderFunctionArgs) => {
  const marketLvls = await getMarketLvlsFX(Number(params.marketId));
  return { marketLvls };
};
