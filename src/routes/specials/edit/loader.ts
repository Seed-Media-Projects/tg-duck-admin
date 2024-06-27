import { getSpecialFX } from '@core/specials';
import { LoaderFunctionArgs } from 'react-router-dom';

export const specialLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.specialId) {
    return { special: null };
  }

  const special = await getSpecialFX(Number(params.specialId));
  return { special };
};
