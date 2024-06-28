import { SaveMarketLvl, updateMarketLvlFX } from '@core/market-lvls';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateMarketLvlAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveMarketLvl;

  try {
    await updateMarketLvlFX({
      ...payload,
      marketId: Number(params.marketId),
      price: Number(payload.price),
      incomePerHour: Number(payload.incomePerHour),
      lvl: Number(payload.lvl),
      id: Number(params.lvlId),
    });
  } catch (error) {
    return {
      error: 'Cannot update market lvl',
    };
  }

  return redirect(`/markets/${params.marketId}/lvls`);
};
