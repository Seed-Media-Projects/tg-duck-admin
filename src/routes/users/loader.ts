import { getUsersListFX } from '../../core/users';

export const usersLoader = async () => {
  const users = await getUsersListFX(0);
  return { users };
};
