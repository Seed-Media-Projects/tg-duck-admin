import { getTasksFX } from '@core/tasks';

export const tasksLoader = async () => {
  const tasks = await getTasksFX();
  return { tasks };
};
