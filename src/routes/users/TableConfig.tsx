import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import { ColumnShape } from 'react-base-table';
import { UserListItem, getUserLvlFromExp, userRoutes } from '../../core/users';
import { RowOptionsIcons, actionsConfig } from '../../ui/table/RowOptions';
import { avatarNameLinkColumn, typographyColumn, typographyColumnToKey } from '../../ui/table/config-elements';
export const tableUsersConfig: ColumnShape<UserListItem>[] = [
  {
    title: 'Name',
    ...avatarNameLinkColumn({ link: id => userRoutes.detail(id) }),
  },
  {
    title: 'Max referrals',
    ...typographyColumn({ dataKey: 'maxReferrals' }),
  },
  {
    title: 'Coins',
    ...typographyColumnToKey('userInfo', 'coins'),
  },
  {
    title: 'Total taps',
    ...typographyColumnToKey('userInfo', 'totalTaps'),
  },
  {
    title: 'Time spent',
    ...typographyColumnToKey('userInfo', 'timeSpent'),
  },
  {
    title: 'Income per hour',
    ...typographyColumnToKey('userInfo', 'incomePerHour'),
  },
  {
    title: 'Coins per tap',
    ...typographyColumnToKey('userInfo', 'coinsPerTap'),
  },
  {
    key: 'energy',
    title: 'Energy',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.userInfo.energy}/{rowData.userInfo.maxEnergy}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'experience',
    title: 'Lvl',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{getUserLvlFromExp(rowData.userInfo.experience)}</Typography>
        </div>
      );
    },
  },
  {
    title: 'Bet coins',
    ...typographyColumnToKey('userInfo', 'betCoins'),
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
