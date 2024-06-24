import { createEffect } from 'effector';
import { AX } from '../data/fetcher';
import { LS, LSKeys } from '../local-store';

export const sigin = createEffect(async (payload: { username: string; password: string }) => {
  const { data } = await AX.post<{
    token: string;
  }>('/admin/api/auth/login', payload);
  AX.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  LS.setItem(LSKeys.AuthToken, data.token);

  return data.token;
});
