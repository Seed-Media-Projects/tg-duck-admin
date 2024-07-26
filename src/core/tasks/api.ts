import { createEffect } from 'effector';
import { ChangePositionPayload } from '../common';
import { AXDUCK } from '../data/fetcher';
import { SaveTask, TaskItem } from './types';

export const getTasksFX = createEffect(async () => {
  const { data } = await AXDUCK.get<TaskItem[]>('/admin/api/task');

  return data;
});

export const deleteTaskFX = createEffect(async (id: number) => {
  await AXDUCK.delete(`/admin/api/task/${id}`);
});
export const changePositionTaskFX = createEffect(async (positions: ChangePositionPayload[]) => {
  await AXDUCK.post('/admin/api/task/position', { positions });
});

export const getTaskFX = createEffect(async (id: number) => {
  const { data } = await AXDUCK.get<TaskItem>(`/admin/api/task/${id}`);

  return data;
});
export const updateTaskFX = createEffect(async ({ id, ...payload }: { id: number } & SaveTask) => {
  await AXDUCK.put(`/admin/api/task/${id}`, payload);
});
export const createTaskFX = createEffect(async (payload: SaveTask) => {
  await AXDUCK.post('/admin/api/task', payload);
});
