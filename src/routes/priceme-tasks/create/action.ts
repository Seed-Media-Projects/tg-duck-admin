import { createPricemeTaskFX, SavePricemeTask } from '@core/priceme-tasks';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createTaskAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SavePricemeTask;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createPricemeTaskFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      rewardMc: Number(payload.rewardMc),
      rewardFc: Number(payload.rewardFc),
    });
  } catch (error) {
    return {
      error: 'Cannot create task',
    };
  }

  return redirect('/priceme/tasks');
};
