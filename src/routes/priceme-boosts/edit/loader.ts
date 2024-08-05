import { getPricemeBoostFX } from '@core/priceme-boosts';
import { LoaderFunctionArgs } from 'react-router-dom';

export const boostLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.boostId) {
    return { boost: null };
  }

  const boost = await getPricemeBoostFX(Number(params.boostId));
  return { boost };
};
