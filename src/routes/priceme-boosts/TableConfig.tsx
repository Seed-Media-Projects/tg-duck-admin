import { deletePricemeBoostFX, PricemeBoostItem } from '@core/priceme-boosts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { actionsConfig, RowOptionsIcons } from '@ui/table/RowOptions';
import { typographyColumn } from '@ui/table/config-elements';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useNavigate } from 'react-router-dom';

export const tableBoostsConfig: ColumnShape<PricemeBoostItem>[] = [
  {
    title: 'Level',
    ...typographyColumn({ dataKey: 'lvl' }),
    width: 80,
  },
  {
    title: 'First buy MC',
    ...typographyColumn({ dataKey: 'primaryMcPrice' }),
  },
  {
    title: 'First buy FC',
    ...typographyColumn({ dataKey: 'primaryFcPrice' }),
  },
  {
    title: 'Second buy MC',
    ...typographyColumn({ dataKey: 'secondaryMcPrice' }),
  },
  {
    title: 'Second buy FC',
    ...typographyColumn({ dataKey: 'secondaryFcPrice' }),
  },
  {
    title: 'Income',
    ...typographyColumn({ dataKey: 'incomeMc' }),
  },
  {
    title: 'Income duration',
    ...typographyColumn({ dataKey: 'incomePeriod' }),
  },
  {
    title: 'Boost duration',
    ...typographyColumn({ dataKey: 'boostDuration' }),
  },

  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => <Actions boost={rowData} />,
    width: 200,
  },
];

const Actions = ({ boost }: { boost: PricemeBoostItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deletePricemeBoostFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Edit',
          link: `/priceme/boosts/${boost.id}/edit`,
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
              deletePricemeBoostFX(boost.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete boost lvl: ${boost.lvl}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
