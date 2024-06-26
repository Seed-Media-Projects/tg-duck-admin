import { getConfigDataFX } from '../../core/config';

export const configLoader = async () => {
  const config = await getConfigDataFX();
  return { config };
};
