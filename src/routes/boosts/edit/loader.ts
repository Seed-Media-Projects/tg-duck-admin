import { getBoostFX } from '@core/boosts';
import { LoaderFunctionArgs } from 'react-router-dom';

export const boostLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.boostId) {
    return { boost: null };
  }

  const boost = await getBoostFX(Number(params.boostId));
  return { boost };
};
