import { AXDUCK, AXPRICE } from '@core/data/fetcher';
import { AxiosError } from 'axios';
import { createEffect } from 'effector';
import { HealthInfo } from './types';

export const getHealthFX = createEffect(async () => {
  try {
    const { data } = await AXDUCK.get<HealthInfo>('/api/health');

    return data;
  } catch (error) {
    const axErr = error as AxiosError;

    return axErr.response?.data as HealthInfo;
  }
});

export const getHealthPricemeFX = createEffect(async () => {
  try {
    const { data } = await AXPRICE.get<HealthInfo>('/api/health');

    return data;
  } catch (error) {
    const axErr = error as AxiosError;

    return axErr.response?.data as HealthInfo;
  }
});
