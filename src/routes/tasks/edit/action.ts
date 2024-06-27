import { SaveTask, updateTaskFX } from '@core/tasks';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateTaskAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveTask;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await updateTaskFX({
      ...payload,
      fileId: Number(payload.fileId),
      position: Number(payload.position),
      rewardCoins: Number(payload.rewardCoins),
      rewardExperience: Number(payload.rewardExperience),
      id: Number(params.taskId),
    });
  } catch (error) {
    return {
      error: 'Cannot update task',
    };
  }

  return redirect('/tasks');
};
