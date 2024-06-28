import { SaveMarketLvl, createMarketLvlFX } from '@core/market-lvls';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createMarketLvlAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveMarketLvl;

  try {
    await createMarketLvlFX({
      ...payload,
      marketId: Number(params.marketId),
      price: Number(payload.price),
      incomePerHour: Number(payload.incomePerHour),
      lvl: Number(payload.lvl),
    });
  } catch (error) {
    return {
      error: 'Cannot create market lvl',
    };
  }

  return redirect(`/markets/${params.marketId}/lvls`);
};
