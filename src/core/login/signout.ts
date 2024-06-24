import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { LS, LSKeys } from '../local-store';

export const signout = createEffect(() => {
  delete AX.defaults.headers.common['Authorization'];
  LS.deleteItem(LSKeys.AuthToken);
});
