import { createStore } from 'effector';
import { getPricemeUsersListFX, initGetPricemeUsersListFX } from './api';
import { UserListItem } from './types';

export const $users = createStore<{
  users: UserListItem[];
  offset: number;
}>({
  users: [],
  offset: 0,
});

$users.on(getPricemeUsersListFX.doneData, (state, users) => ({
  users: state.users.concat(users),
  offset: state.offset + 100,
}));

$users.on(initGetPricemeUsersListFX.doneData, (_, users) => ({
  users,
  offset: 100,
}));
