import { $users, getPricemeUsersListFX, initGetPricemeUsersListFX } from '@core/priceme-users';
import { CardHeader, Grid } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useUnit } from 'effector-react';
import { tableUsersConfig } from './TableConfig';

export const Component = () => {
  const { offset, users } = useUnit($users);

  return (
    <Grid item xs={12}>
      <BaseList
        data={users}
        config={tableUsersConfig}
        listHeader={<CardHeader title="Priceme users" />}
        loadMore={() => {
          if (users.length >= offset) {
            getPricemeUsersListFX(offset);
          }
        }}
      />
    </Grid>
  );
};

Component.displayName = 'UsersPage';

export const loader = async () => {
  const users = await initGetPricemeUsersListFX();
  return { users };
};
