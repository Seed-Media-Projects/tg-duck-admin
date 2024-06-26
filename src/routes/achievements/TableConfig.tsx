import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useNavigate } from 'react-router-dom';
import { AchievementItem, deleteAchievementFX } from '../../core/achievements';
import { ActionModal } from '../../ui/modal/ActionModal';
import { RowOptionsIcons, actionsConfig } from '../../ui/table/RowOptions';
import { typographyColumn } from '../../ui/table/config-elements';

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
    cellRenderer: ({ rowData }) => <Actions achievement={rowData} />,
  },
];

const Actions = ({ achievement }: { achievement: AchievementItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteAchievementFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Detail',
          link: `/achievements/${achievement.id}/edit`,
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
              deleteAchievementFX(achievement.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title="Delete config."
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
