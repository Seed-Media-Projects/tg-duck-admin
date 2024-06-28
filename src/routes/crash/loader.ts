import { getCrashGameQueueStatusFX, initGetCrashGamesListFX } from '@core/crash';

export const crashGamesLoader = async () => {
  const [games, queueStatus] = await Promise.all([initGetCrashGamesListFX(), getCrashGameQueueStatusFX()]);
  return { games, queueStatus };
};
