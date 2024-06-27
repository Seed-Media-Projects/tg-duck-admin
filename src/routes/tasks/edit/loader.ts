import { getTaskFX } from '@core/tasks';
import { LoaderFunctionArgs } from 'react-router-dom';

export const taskLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.taskId) {
    return { task: null };
  }

  const task = await getTaskFX(Number(params.taskId));
  return { task };
};
