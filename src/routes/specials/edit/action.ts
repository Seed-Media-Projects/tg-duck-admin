import { SaveSpecial, updateSpecialFX } from '@core/specials';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateSpecialAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveSpecial;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateSpecialFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      duration: Number(payload.duration),
      cooldown: Number(payload.cooldown),
      requiredLvl: Number(payload.requiredLvl),
      id: Number(params.specialId),
    });
  } catch (error) {
    return {
      error: 'Cannot update special',
    };
  }

  return redirect('/specials');
};
