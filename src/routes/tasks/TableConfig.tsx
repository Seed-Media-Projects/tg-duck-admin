import { TaskItem, changePositionTaskFX, deleteTaskFX } from '@core/tasks';
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

export const tableTasksConfig: ColumnShape<TaskItem>[] = [
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
    title: 'Reward exp',
    ...typographyColumn({ dataKey: 'rewardExperience' }),
  },
  {
    title: 'Reward coins',
    ...typographyColumn({ dataKey: 'rewardCoins' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData, rowIndex }) => <Actions task={rowData} rowIndex={rowIndex} />,
    width: 200,
  },
];

const Actions = ({ task, rowIndex }: { task: TaskItem; rowIndex: number }) => {
  const { tasks } = useLoaderData() as { tasks: TaskItem[] };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteTaskFX.pending);
  const loadingPosition = useUnit(changePositionTaskFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const moveUp = () => {
    const targetItem = tasks[rowIndex];
    const upperItem = tasks[rowIndex - 1];

    if (targetItem && upperItem) {
      changePositionTaskFX([
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
      changePositionTaskFX([
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
          link: `/tasks/${task.id}/edit`,
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
              deleteTaskFX(task.id).then(() => {
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
