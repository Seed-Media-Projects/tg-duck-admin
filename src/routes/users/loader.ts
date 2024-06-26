import { initGetUsersListFX } from '../../core/users';

export const usersLoader = async () => {
  const users = await initGetUsersListFX();
  return { users };
};
