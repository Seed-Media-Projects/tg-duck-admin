import { getHealthFX, getHealthPricemeFX } from '@core/health';

export const homeLoader = async () => {
  const [{ details: detailsDuck }, { details: detailsPriceme }] = await Promise.all([getHealthFX(), getHealthPricemeFX()]);
  return { detailsDuck, detailsPriceme };
};
