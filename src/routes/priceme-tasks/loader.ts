import { getPricemeTasksFX } from '@core/priceme-tasks';

export const tasksLoader = async () => {
  const tasks = await getPricemeTasksFX();
  return { tasks };
};
