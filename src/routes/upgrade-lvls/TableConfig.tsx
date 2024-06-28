import { UpgradeLvlItem, deleteUpgradeLvlFX } from '@core/upgrade-lvls';
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

export const tableUpgradeLvlsConfig: ColumnShape<UpgradeLvlItem>[] = [
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
    title: 'Increase amount',
    ...typographyColumn({ dataKey: 'increaseAmount' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => <Actions upgradeLvl={rowData} />,
  },
];

const Actions = ({ upgradeLvl }: { upgradeLvl: UpgradeLvlItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteUpgradeLvlFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { upgradeId } = useParams();

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Edit',
          link: `/upgrades/${upgradeId}/lvls/${upgradeLvl.id}/edit`,
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
              deleteUpgradeLvlFX({ id: upgradeLvl.id, upgradeId: Number(upgradeId) }).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete upgrade lvl: ${upgradeLvl.lvl}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
