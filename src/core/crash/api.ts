import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { CrashGameInfo, CrashGameItem } from './types';

export const initGetCrashGamesListFX = createEffect(async () => {
  const { data } = await AX.get<CrashGameItem[]>('/admin/api/crash', {
    params: {
      offset: 0,
    },
  });

  return data;
});
export const getCrashGamesListFX = createEffect(async (offset: number) => {
  const { data } = await AX.get<CrashGameItem[]>('/admin/api/crash', {
    params: {
      offset,
    },
  });

  return data;
});

export const getCrashGameDataFX = createEffect(async (gameId: number) => {
  const { data } = await AX.get<CrashGameInfo>(`/admin/api/crash/${gameId}`);

  return data;
});
export const getCrashGameQueueStatusFX = createEffect(async () => {
  const { data } = await AX.get<boolean>('/admin/api/crash/queue/status');

  return data;
});

export const startCrashGamesFX = createEffect(async () => {
  await AX.post('/admin/api/crash/init');
});
export const stopCrashGamesFX = createEffect(async () => {
  await AX.delete('/admin/api/crash/all');
});
