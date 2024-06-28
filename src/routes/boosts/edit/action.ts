import { SaveBoost, updateBoostFX } from '@core/boosts';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateBoostAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveBoost;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateBoostFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      maxQuantity: Number(payload.maxQuantity),
      activeTime: Number(payload.activeTime),
      id: Number(params.boostId),
    });
  } catch (error) {
    return {
      error: 'Cannot update boost',
    };
  }

  return redirect('/boosts');
};
