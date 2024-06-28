import { SaveMarket, updateMarketFX } from '@core/markets';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateMarketAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveMarket;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateMarketFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      id: Number(params.marketId),
    });
  } catch (error) {
    return {
      error: 'Cannot update market',
    };
  }

  return redirect('/markets');
};
