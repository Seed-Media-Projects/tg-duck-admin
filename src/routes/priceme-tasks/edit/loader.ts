import { getPricemeTaskFX } from '@core/priceme-tasks';
import { LoaderFunctionArgs } from 'react-router-dom';

export const taskLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.taskId) {
    return { task: null };
  }

  const task = await getPricemeTaskFX(Number(params.taskId));
  return { task };
};
