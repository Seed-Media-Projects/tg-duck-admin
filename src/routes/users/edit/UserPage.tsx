import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useLoaderData } from 'react-router-dom';
import { getUserLvlFromExp, UserInfo } from '../../../core/users';
import { getDiceBearAvatar } from '../../../core/utils/dicebear';
import { getInitials } from '../../../core/utils/get-initials';
export const UserPage = () => {
  const { user } = useLoaderData() as { user: UserInfo | null };

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        User info
      </Typography>
      <Box my={2}>
        <Link href={`/users/${user.id}/edit`}>
          <Button variant="contained">Edit</Button>
        </Link>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Avatar
          sx={{ width: 30, height: 30, fontSize: '.875rem' }}
          src={user.photoUrl || getDiceBearAvatar(`${user.firstName}-${user.lastName}`)}
        >
          {user.photoUrl ? null : getInitials(`${user.firstName} ${user.lastName}`)}
        </Avatar>
        <Typography textTransform="capitalize">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Typography gutterBottom>Max referrals: {user.maxReferrals}</Typography>
      <Typography gutterBottom>Language: {user.language}</Typography>
      <Typography gutterBottom>Lvl: {getUserLvlFromExp(user.userInfo.experience)}</Typography>
      <Typography gutterBottom>Income per hour: {user.userInfo.incomePerHour}</Typography>
      <Typography gutterBottom>
        Energy: {user.userInfo.energy}/{user.userInfo.maxEnergy}
      </Typography>
      <Typography gutterBottom>Coins: {user.userInfo.coins}</Typography>
      <Typography gutterBottom>Coins per tap: {user.userInfo.coinsPerTap}</Typography>
      <Typography gutterBottom>Bet coins: {user.userInfo.betCoins}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography gutterBottom>Referrals count: {user.referrals.length}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        User crash games
      </Typography>
      <Typography gutterBottom>Total games: {user.userGames.length}</Typography>
      <Typography gutterBottom>Winning games: {user.userGames.filter(g => g.winner).length}</Typography>
      <Typography gutterBottom>
        Last 5 bet+ratio:{' '}
        {user.userGames
          .slice(0)
          .slice(-5)
          .map(g => `bet -> ${g.bet} and ratio -> ${g.ratio}`)
          .join(', ')}
      </Typography>
    </Box>
  );
};
