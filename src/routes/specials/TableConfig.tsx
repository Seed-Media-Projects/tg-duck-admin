import { SpecialItem, changePositionSpecialFX, deleteSpecialFX } from '@core/specials';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { RowOptionsIcons, actionsConfig } from '@ui/table/RowOptions';
import { typographyColumn } from '@ui/table/config-elements';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const tableSpecialsConfig: ColumnShape<SpecialItem>[] = [
  {
    title: 'Position',
    ...typographyColumn({ dataKey: 'position' }),
    width: 80,
  },
  {
    title: 'Name',
    ...typographyColumn({ dataKey: 'name' }),
  },
  {
    title: 'Type',
    ...typographyColumn({ dataKey: 'type' }),
  },
  {
    title: 'Description',
    ...typographyColumn({ dataKey: 'description' }),
  },
  {
    title: 'Effect',
    ...typographyColumn({ dataKey: 'effect' }),
  },
  {
    title: 'Cooldown',
    ...typographyColumn({ dataKey: 'cooldown' }),
  },
  {
    title: 'Duration',
    ...typographyColumn({ dataKey: 'duration' }),
  },
  {
    title: 'Required lvl',
    ...typographyColumn({ dataKey: 'requiredLvl' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData, rowIndex }) => <Actions special={rowData} rowIndex={rowIndex} />,
    width: 200,
  },
];

const Actions = ({ special, rowIndex }: { special: SpecialItem; rowIndex: number }) => {
  const { specials } = useLoaderData() as { specials: SpecialItem[] };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteSpecialFX.pending);
  const loadingPosition = useUnit(changePositionSpecialFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const moveUp = () => {
    const targetItem = specials[rowIndex];
    const upperItem = specials[rowIndex - 1];

    if (targetItem && upperItem) {
      changePositionSpecialFX([
        {
          id: targetItem.id,
          position: targetItem.position - 1,
        },
        {
          id: upperItem.id,
          position: upperItem.position + 1,
        },
      ]).then(() => {
        navigate('.', { replace: true });
      });
    }
  };
  const moveDown = () => {
    const targetItem = specials[rowIndex];
    const downItem = specials[rowIndex + 1];

    if (targetItem && downItem) {
      changePositionSpecialFX([
        {
          id: targetItem.id,
          position: targetItem.position + 1,
        },
        {
          id: downItem.id,
          position: downItem.position - 1,
        },
      ]).then(() => {
        navigate('.', { replace: true });
      });
    }
  };

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Edit',
          link: `/specials/${special.id}/edit`,
        },
      ]}
      deleteBtn={
        <>
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={moveUp} disabled={rowIndex === 0 || loadingPosition}>
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton onClick={moveDown} disabled={rowIndex === specials.length - 1 || loadingPosition}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deleteSpecialFX(special.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete special: ${special.name}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
