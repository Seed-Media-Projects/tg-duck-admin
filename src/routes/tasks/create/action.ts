import { SaveTask, createTaskFX } from '@core/tasks';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createTaskAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveTask;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createTaskFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      rewardCoins: Number(payload.rewardCoins),
      rewardExperience: Number(payload.rewardExperience),
    });
  } catch (error) {
    return {
      error: 'Cannot create task',
    };
  }

  return redirect('/tasks');
};
