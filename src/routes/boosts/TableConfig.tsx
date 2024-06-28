import { BoostItem, changePositionBoostFX, deleteBoostFX } from '@core/boosts';
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

export const tableBoostsConfig: ColumnShape<BoostItem>[] = [
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
    title: 'Max quantity',
    ...typographyColumn({ dataKey: 'maxQuantity' }),
  },
  {
    title: 'Active time',
    ...typographyColumn({ dataKey: 'activeTime' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData, rowIndex }) => <Actions boost={rowData} rowIndex={rowIndex} />,
    width: 200,
  },
];

const Actions = ({ boost, rowIndex }: { boost: BoostItem; rowIndex: number }) => {
  const { boosts } = useLoaderData() as { boosts: BoostItem[] };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteBoostFX.pending);
  const loadingPosition = useUnit(changePositionBoostFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const moveUp = () => {
    const targetItem = boosts[rowIndex];
    const upperItem = boosts[rowIndex - 1];

    if (targetItem && upperItem) {
      changePositionBoostFX([
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
    const targetItem = boosts[rowIndex];
    const downItem = boosts[rowIndex + 1];

    if (targetItem && downItem) {
      changePositionBoostFX([
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
          link: `/boosts/${boost.id}/edit`,
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
          <IconButton onClick={moveDown} disabled={rowIndex === boosts.length - 1 || loadingPosition}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deleteBoostFX(boost.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete boost: ${boost.name}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
