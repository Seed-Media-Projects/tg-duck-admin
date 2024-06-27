import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AX } from '../data/fetcher';
import { SaveTask, TaskItem } from './types';

export const getTasksFX = createEffect(async () => {
  const { data } = await AX.get<TaskItem[]>('/admin/api/task');

  return data;
});

export const deleteTaskFX = createEffect(async (id: number) => {
  await AX.delete(`/admin/api/task/${id}`);
});
export const changePositionTaskFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AX.post('/admin/api/task/position', { positions });
});

export const getTaskFX = createEffect(async (id: number) => {
  const { data } = await AX.get<TaskItem>(`/admin/api/task/${id}`);

  return data;
});
export const updateTaskFX = createEffect(async ({ id, ...payload }: { id: number } & SaveTask) => {
  await AX.put(`/admin/api/task/${id}`, payload);
});
export const createTaskFX = createEffect(async (payload: SaveTask) => {
  await AX.post('/admin/api/task', payload);
});
