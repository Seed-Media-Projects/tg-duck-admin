import { UserInfo, getPricemeUserDataFX, resetPricemeUserDataFX } from '@core/priceme-users';
import { getDiceBearAvatar } from '@core/utils/dicebear';
import { getInitials } from '@core/utils/get-initials';
import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ActionModal } from '@ui/modal/ActionModal';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';

export const Component = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useLoaderData() as { user: UserInfo | null };
  const loading = useUnit(resetPricemeUserDataFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        User info
      </Typography>
      <Box my={2} display="flex" gap={2}>
        <Link href={`/priceme/users/${user.id}/edit`}>
          <Button variant="contained">Edit</Button>
        </Link>
        <Button onClick={handleOpen} variant="contained" color="error">
          Delete
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Avatar
          sx={{ width: 30, height: 30, fontSize: '.875rem' }}
          src={
            user.photoUrl
              ? `${import.meta.env.VITE_SERVER_URL_PRICEME}${user.photoUrl}`
              : getDiceBearAvatar(`${user.firstName}-${user.lastName}`)
          }
        >
          {user.photoUrl ? null : getInitials(`${user.firstName} ${user.lastName}`)}
        </Avatar>
        <Typography textTransform="capitalize">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Typography gutterBottom>Language: {user.language}</Typography>
      <Typography gutterBottom>Main coins: {user.userInfo.mainCoin}</Typography>
      <Typography gutterBottom>Friends coins: {user.userInfo.friendsCoin}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography gutterBottom>Referrals count: {user.referralsCount[0].count}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography gutterBottom variant="h6">
        Transactions
      </Typography>
      {user.transactionsGroups.map(t => (
        <Typography key={t.type} gutterBottom>
          {t.type}: {t.sum}
        </Typography>
      ))}
      <ActionModal
        loading={loading}
        onClose={handleClose}
        onConfirm={() => {
          resetPricemeUserDataFX(user.id).then(() => {
            handleClose();
            navigate('.', { replace: true });
          });
        }}
        open={open}
        title={`Delete user ${user.firstName}`}
        subtitle="This action will delete user. Are you sure?"
      />
    </Box>
  );
};

Component.displayName = 'UserPage';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    return { user: null };
  }

  const user = await getPricemeUserDataFX(Number(params.userId));
  return { user };
};
