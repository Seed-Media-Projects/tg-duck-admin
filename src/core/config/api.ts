import { createEffect } from 'effector';
import { AXDUCK } from '../data/fetcher';
import { ConfigData, SaveConfigPayload } from './types';

export const getConfigDataFX = createEffect(async () => {
  try {
    const { data } = await AXDUCK.get<ConfigData | null>('/admin/api/config');

    return data;
  } catch (error) {
    return null;
  }
});

export const createConfigFX = createEffect(async (payload: SaveConfigPayload) => {
  await AXDUCK.post('/admin/api/config', payload);
});
export const updateConfigFX = createEffect(async (payload: SaveConfigPayload) => {
  await AXDUCK.put('/admin/api/config', payload);
});
export const deleteConfigFX = createEffect(async () => {
  await AXDUCK.delete('/admin/api/config');
});
