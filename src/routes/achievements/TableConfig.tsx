import { AchievementItem, changePositionAchievementFX, deleteAchievementFX } from '@core/achievements';
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

export const tableAchievementsConfig: ColumnShape<AchievementItem>[] = [
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
    title: 'Category',
    ...typographyColumn({ dataKey: 'category' }),
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
    title: 'Reward exp',
    ...typographyColumn({ dataKey: 'rewardExperience' }),
  },
  {
    title: 'Reward coins',
    ...typographyColumn({ dataKey: 'rewardCoins' }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData, rowIndex }) => <Actions achievement={rowData} rowIndex={rowIndex} />,
    width: 200,
  },
];

const Actions = ({ achievement, rowIndex }: { achievement: AchievementItem; rowIndex: number }) => {
  const { achievements } = useLoaderData() as { achievements: AchievementItem[] };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteAchievementFX.pending);
  const loadingPosition = useUnit(changePositionAchievementFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const moveUp = () => {
    const targetItem = achievements[rowIndex];
    const upperItem = achievements[rowIndex - 1];

    if (targetItem && upperItem) {
      changePositionAchievementFX([
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
    const targetItem = achievements[rowIndex];
    const downItem = achievements[rowIndex + 1];

    if (targetItem && downItem) {
      changePositionAchievementFX([
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
          link: `/achievements/${achievement.id}/edit`,
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
          <IconButton onClick={moveDown} disabled={rowIndex === achievements.length - 1 || loadingPosition}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deleteAchievementFX(achievement.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete achievement: ${achievement.name}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
