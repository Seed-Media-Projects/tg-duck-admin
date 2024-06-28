import { getCrashGameDataFX } from '@core/crash';
import { LoaderFunctionArgs } from 'react-router-dom';

export const crashGameLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.gameId) {
    return { game: null };
  }

  const game = await getCrashGameDataFX(Number(params.gameId));
  return { game };
};
