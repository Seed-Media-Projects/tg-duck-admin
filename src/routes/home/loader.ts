import { getHealthFX } from '@core/health';

export const homeLoader = async () => {
  const { details } = await getHealthFX();
  return { details };
};
