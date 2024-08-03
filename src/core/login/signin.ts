import { createEffect } from 'effector';
import { AXDUCK, AXPRICE } from '../data/fetcher';
import { LS, LSKeys } from '../local-store';

export const sigin = createEffect(async (payload: { username: string; password: string }) => {
  const { data } = await AXDUCK.post<{
    token: string;
  }>('/admin/api/auth/login', payload);
  AXDUCK.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  AXPRICE.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  LS.setItem(LSKeys.AuthToken, data.token);

  return data.token;
});
