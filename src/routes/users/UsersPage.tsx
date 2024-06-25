import { CardHeader, Grid } from '@mui/material';
import { useUnit } from 'effector-react';
import { getUsersListFX } from '../../core/users';
import { $users } from '../../core/users/store';
import { BaseList } from '../../ui/table/BaseTable';
import { tableUsersConfig } from './TableConfig';

export const UsersPage = () => {
  const { offset, users } = useUnit($users);

  return (
    <Grid item xs={12}>
      <BaseList
        data={users}
        config={tableUsersConfig}
        listHeader={<CardHeader title="Users" />}
        loadMore={() => {
          if (users.length >= offset) {
            getUsersListFX(offset);
          }
        }}
      />
    </Grid>
  );
};
