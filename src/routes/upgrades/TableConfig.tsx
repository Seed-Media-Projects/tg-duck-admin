import { UpgradeItem, deleteUpgradeFX } from '@core/upgrades';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { RowOptionsIcons, actionsConfig } from '@ui/table/RowOptions';
import { typographyColumn } from '@ui/table/config-elements';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useNavigate } from 'react-router-dom';

export const tableUpgradesConfig: ColumnShape<UpgradeItem>[] = [
  {
    title: 'Name',
    ...typographyColumn({ dataKey: 'name' }),
  },
  {
    title: 'Description',
    ...typographyColumn({ dataKey: 'description' }),
  },
  {
    title: 'Type',
    ...typographyColumn({ dataKey: 'type' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => <Actions upgrade={rowData} />,
  },
];

const Actions = ({ upgrade }: { upgrade: UpgradeItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteUpgradeFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Edit',
          link: `/upgrades/${upgrade.id}/edit`,
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
              deleteUpgradeFX(upgrade.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete upgrade: ${upgrade.name}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
