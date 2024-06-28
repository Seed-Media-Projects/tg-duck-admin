import { SaveSpecial, createSpecialFX } from '@core/specials';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createSpecialAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveSpecial;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createSpecialFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      cooldown: Number(payload.cooldown),
      duration: Number(payload.duration),
      requiredLvl: Number(payload.requiredLvl),
    });
  } catch (error) {
    return {
      error: 'Cannot create special',
    };
  }

  return redirect('/specials');
};
