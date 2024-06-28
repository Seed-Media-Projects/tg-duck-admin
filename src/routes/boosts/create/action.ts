import { SaveBoost, createBoostFX } from '@core/boosts';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createBoostAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveBoost;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createBoostFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      maxQuantity: Number(payload.maxQuantity),
      activeTime: Number(payload.activeTime),
    });
  } catch (error) {
    return {
      error: 'Cannot create boost',
    };
  }

  return redirect('/boosts');
};
