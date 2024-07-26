import { createEffect } from 'effector';
import { AXDUCK } from '../data/fetcher';
import { CrashGameInfo, CrashGameItem } from './types';

export const initGetCrashGamesListFX = createEffect(async () => {
  const { data } = await AXDUCK.get<CrashGameItem[]>('/admin/api/crash', {
    params: {
      offset: 0,
    },
  });

  return data;
});
export const getCrashGamesListFX = createEffect(async (offset: number) => {
  const { data } = await AXDUCK.get<CrashGameItem[]>('/admin/api/crash', {
    params: {
      offset,
    },
  });

  return data;
});

export const getCrashGameDataFX = createEffect(async (gameId: number) => {
  const { data } = await AXDUCK.get<CrashGameInfo>(`/admin/api/crash/${gameId}`);

  return data;
});
export const getCrashGameQueueStatusFX = createEffect(async () => {
  const { data } = await AXDUCK.get<boolean>('/admin/api/crash/queue/status');

  return data;
});

export const startCrashGamesFX = createEffect(async () => {
  await AXDUCK.post('/admin/api/crash/init');
});
export const stopCrashGamesFX = createEffect(async () => {
  await AXDUCK.delete('/admin/api/crash/all');
});
