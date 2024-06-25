import { createStore } from 'effector';
import { getUsersListFX } from './api';
import { UserListItem } from './types';

export const $users = createStore<{
  users: UserListItem[];
  offset: number;
}>({
  users: [],
  offset: 0,
});

$users.on(getUsersListFX.doneData, (state, users) => ({
  users: state.users.concat(users),
  offset: state.offset + 100,
}));
