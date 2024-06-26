import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { createConfigFX, SaveConfigPayload } from '../../../core/config';

export const createConfigAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveConfigPayload;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createConfigFX({
      ...payload,
      notification: !!payload.notification,
      techProblem: !!payload.techProblem,
      fileId: Number(payload.fileId),
    });
  } catch (error) {
    return {
      error: 'Cannot create config',
    };
  }

  return redirect('/config');
};
