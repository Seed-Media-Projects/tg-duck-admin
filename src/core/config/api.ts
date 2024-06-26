import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { ConfigData, SaveConfigPayload } from './types';

export const getConfigDataFX = createEffect(async () => {
  try {
    const { data } = await AX.get<ConfigData | null>('/admin/api/config');

    return data;
  } catch (error) {
    return null;
  }
});

export const createConfigFX = createEffect(async (payload: SaveConfigPayload) => {
  await AX.post('/admin/api/config', payload);
});
export const updateConfigFX = createEffect(async (payload: SaveConfigPayload) => {
  await AX.put('/admin/api/config', payload);
});
export const deleteConfigFX = createEffect(async () => {
  await AX.delete('/admin/api/config');
});
