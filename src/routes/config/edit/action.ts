import { SaveConfigPayload, updateConfigFX } from '@core/config';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateConfigAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveConfigPayload;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateConfigFX({
      ...payload,
      notification: !!payload.notification,
      techProblem: !!payload.techProblem,
      fileId: Number(payload.fileId),
    });
  } catch (error) {
    return {
      error: 'Cannot update config',
    };
  }

  return redirect('/config');
};
