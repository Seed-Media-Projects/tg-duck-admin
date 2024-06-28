import { createStore } from 'effector';
import { getCrashGamesListFX, initGetCrashGamesListFX } from './api';
import { CrashGameItem } from './types';

export const $games = createStore<{
  games: CrashGameItem[];
  offset: number;
}>({
  games: [],
  offset: 0,
});

$games.on(getCrashGamesListFX.doneData, (state, games) => ({
  games: state.games.concat(games),
  offset: state.offset + 100,
}));

$games.on(initGetCrashGamesListFX.doneData, (_, games) => ({
  games,
  offset: 100,
}));
