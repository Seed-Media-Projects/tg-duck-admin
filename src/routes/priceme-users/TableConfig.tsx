import { UserListItem, userRoutes } from '@core/priceme-users';
import EditIcon from '@mui/icons-material/Edit';
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
