import { AX } from '@core/data/fetcher';
import { createEffect } from 'effector';
import { HealthInfo } from './types';

export const getHealthFX = createEffect(async () => {
  const { data } = await AX.get<HealthInfo>('/api/health');

  return data;
});
