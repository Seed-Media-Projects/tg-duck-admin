import { SavePricemeTask, updatePricemeTaskFX } from '@core/priceme-tasks';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateTaskAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SavePricemeTask;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updatePricemeTaskFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      rewardFc: Number(payload.rewardFc),
      rewardMc: Number(payload.rewardMc),
      id: Number(params.taskId),
    });
  } catch (error) {
    return {
      error: 'Cannot update task',
    };
  }

  return redirect('/priceme/tasks');
};
