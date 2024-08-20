import { UserListItem, userRoutes, UserTransactionType } from '@core/priceme-users';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import { actionsConfig, RowOptionsIcons } from '@ui/table/RowOptions';
import { avatarNameLinkColumn, typographyColumnToKey } from '@ui/table/config-elements';
import { ColumnShape } from 'react-base-table';
export const tableUsersConfig: ColumnShape<UserListItem>[] = [
  {
    title: 'Name',
    ...avatarNameLinkColumn({ link: id => userRoutes.detail(id) }),
  },
  {
    title: 'Main coins',
    ...typographyColumnToKey('userInfo', 'mainCoin'),
  },
  {
    title: 'Friends coins',
    ...typographyColumnToKey('userInfo', 'friendsCoin'),
  },
  {
    key: 'referralsCount',
    title: 'Referrals count',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.referralsCount[0]?.count ?? 0}</Typography>
        </div>
      );
    },
  },
  {
    key: 'FriendReward',
    title: 'Friend reward',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.transactionsGroups.find(g => g.type === UserTransactionType.FriendReward)?.sum ?? 0}
          </Typography>
        </div>
      );
    },
  },

  {
    key: 'BoostIncomeClaim',
    title: 'Boost income claim',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.transactionsGroups.find(g => g.type === UserTransactionType.BoostIncomeClaim)?.sum ?? 0}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'CompletedTask',
    title: 'Completed task',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.transactionsGroups.find(g => g.type === UserTransactionType.CompletedTask)?.sum ?? 0}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'Conversion',
    title: 'Conversion',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.transactionsGroups.find(g => g.type === UserTransactionType.Conversion)?.sum ?? 0}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'AccountPrice',
    title: 'Account price',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.transactionsGroups.find(g => g.type === UserTransactionType.AccountPrice)?.sum ?? 0}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'FriendOfFriendReward',
    title: 'Friend of friend reward',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.transactionsGroups.find(g => g.type === UserTransactionType.FriendOfFriendReward)?.sum ?? 0}
          </Typography>
        </div>
      );
    },
  },

  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => {
      return (
        <RowOptionsIcons
          options={[
            {
              icon: EditIcon,
              name: 'Detail',
              link: userRoutes.detail(rowData.id),
            },
          ]}
        />
      );
    },
  },
];
