import { changePositionPricemeTaskFX, deletePricemeTaskFX, PricemeTaskItem } from '@core/priceme-tasks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { actionsConfig, RowOptionsIcons } from '@ui/table/RowOptions';
import { typographyColumn } from '@ui/table/config-elements';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const tableTasksConfig: ColumnShape<PricemeTaskItem>[] = [
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
    title: 'Description',
    ...typographyColumn({ dataKey: 'description' }),
  },
  {
    title: 'Reward MC',
    ...typographyColumn({ dataKey: 'rewardMc' }),
  },
  {
    title: 'Reward FC',
    ...typographyColumn({ dataKey: 'rewardFc' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData, rowIndex }) => <Actions task={rowData} rowIndex={rowIndex} />,
    width: 200,
  },
];

const Actions = ({ task, rowIndex }: { task: PricemeTaskItem; rowIndex: number }) => {
  const { tasks } = useLoaderData() as { tasks: PricemeTaskItem[] };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deletePricemeTaskFX.pending);
  const loadingPosition = useUnit(changePositionPricemeTaskFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const moveUp = () => {
    const targetItem = tasks[rowIndex];
    const upperItem = tasks[rowIndex - 1];

    if (targetItem && upperItem) {
      changePositionPricemeTaskFX([
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
    const targetItem = tasks[rowIndex];
    const downItem = tasks[rowIndex + 1];

    if (targetItem && downItem) {
      changePositionPricemeTaskFX([
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
          link: `/priceme/tasks/${task.id}/edit`,
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
          <IconButton onClick={moveDown} disabled={rowIndex === tasks.length - 1 || loadingPosition}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deletePricemeTaskFX(task.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete task: ${task.name}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
