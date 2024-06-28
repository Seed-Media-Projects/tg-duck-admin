import { MarketLvlItem, deleteMarketLvlFX } from '@core/market-lvls';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { RowOptionsIcons, actionsConfig } from '@ui/table/RowOptions';
import { typographyColumn } from '@ui/table/config-elements';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useNavigate, useParams } from 'react-router-dom';

export const tableMarketLvlsConfig: ColumnShape<MarketLvlItem>[] = [
  {
    title: 'Lvl',
    ...typographyColumn({ dataKey: 'lvl' }),
    width: 80,
  },
  {
    title: 'Price',
    ...typographyColumn({ dataKey: 'price' }),
  },
  {
    title: 'Income per hour',
    ...typographyColumn({ dataKey: 'incomePerHour' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => <Actions marketLvl={rowData} />,
  },
];

const Actions = ({ marketLvl }: { marketLvl: MarketLvlItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteMarketLvlFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { marketId } = useParams();

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Edit',
          link: `/markets/${marketId}/lvls/${marketLvl.id}/edit`,
        },
      ]}
      deleteBtn={
        <>
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deleteMarketLvlFX({ id: marketLvl.id, marketId: Number(marketId) }).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete market lvl: ${marketLvl.lvl}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
