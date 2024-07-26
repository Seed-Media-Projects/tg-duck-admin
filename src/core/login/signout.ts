import { createEffect } from 'effector';
import { AXDUCK } from '../data/fetcher';
import { LS, LSKeys } from '../local-store';

export const signout = createEffect(() => {
  delete AXDUCK.defaults.headers.common['Authorization'];
  LS.deleteItem(LSKeys.AuthToken);
});
