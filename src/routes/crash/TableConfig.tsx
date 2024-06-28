import { CrashGameItem } from '@core/crash';
import EditIcon from '@mui/icons-material/Edit';
import { idLinkColumn, typographyColumn, typographyDateColumn } from '@ui/table/config-elements';
import { actionsConfig, RowOptionsIcons } from '@ui/table/RowOptions';
import { ColumnShape } from 'react-base-table';

export const tableCrashGamesConfig: ColumnShape<CrashGameItem>[] = [
  {
    title: 'ID',
    ...idLinkColumn({ key: 'id', viewIdKeys: ['id'], link: id => `/crash-games/${id}` }),
  },
  {
    title: 'Result ratio',
    ...typographyColumn({ dataKey: 'resultRatio' }),
  },
  {
    title: 'Created',
    ...typographyDateColumn({ dataKey: 'created', formatString: 'DD MMM YYYY HH:mm:ss' }),
  },
  {
    title: 'Started',
    ...typographyDateColumn({ dataKey: 'started', formatString: 'DD MMM YYYY HH:mm:ss' }),
  },
  {
    title: 'Finished',
    ...typographyDateColumn({ dataKey: 'finished', formatString: 'DD MMM YYYY HH:mm:ss' }),
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
              link: `/crash-games/${rowData.id}`,
            },
          ]}
        />
      );
    },
  },
];
