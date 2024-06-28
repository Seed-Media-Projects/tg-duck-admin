import { SaveMarket, createMarketFX } from '@core/markets';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createMarketAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveMarket;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createMarketFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
    });
  } catch (error) {
    return {
      error: 'Cannot create market',
    };
  }

  return redirect('/markets');
};
