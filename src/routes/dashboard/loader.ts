import { getLast24hUsersCountFX, getUsersBoostCountFX, getUsersCountFX } from '@core/pricemie-dashboard';

export const tasksLoader = async () => {
  const [users24hData, usersBoostData, usersCountData] = await Promise.allSettled([
    getLast24hUsersCountFX(),
    getUsersBoostCountFX(),
    getUsersCountFX(),
  ]);

  return {
    users24h: users24hData.status === 'fulfilled' ? users24hData.value : null,
    usersBoost: usersBoostData.status === 'fulfilled' ? usersBoostData.value : null,
    usersCount: usersCountData.status === 'fulfilled' ? usersCountData.value : null,
  };
};
