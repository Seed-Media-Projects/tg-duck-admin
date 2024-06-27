import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { AchievementItem } from '../../../core/achievements';

export const EditAchievementPage = () => {
  const { achievement } = useLoaderData() as { achievement: AchievementItem | null };

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('firstName') != null;

  const actionData = useActionData() as { error: string } | undefined;

  if (!achievement) {
    return <Typography>Achievement not found</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Form method="post">
        <TextField margin="normal" required fullWidth label="Name" name="name" autoFocus defaultValue={achievement.name} />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};
