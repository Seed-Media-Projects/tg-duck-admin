import { AchievementItem } from '@core/achievements';
import { FileInfo, useUploader } from '@core/files';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { CircularProgressWithLabel } from '@ui/ProgressWithLabel';
import { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { updateAchievementAction } from './action';
import { achievementLoader } from './loader';

const EditAchievementPage = () => {
  const { achievement } = useLoaderData() as { achievement: AchievementItem | null };
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const uploader = useUploader({ onFinishUpload: setFileInfo });

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('name') != null;

  const actionData = useActionData() as { error: string } | undefined;

  useEffect(() => {
    if (achievement?.file) {
      setFileInfo({
        id: achievement.file.id,
        url: achievement.file.fileUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <input type="hidden" name="fileId" value={fileInfo?.id} />
        <input {...uploader.getInputProps()} />
        <Box display="flex" gap={2} flexDirection="column">
          <Button
            sx={{ width: 'max-content' }}
            variant="contained"
            disabled={!!uploader.progress || isLoading}
            onClick={uploader.open}
          >
            {uploader.progress ? (
              <CircularProgressWithLabel size={24} color="primary" value={uploader.progress} />
            ) : (
              'add file'
            )}
          </Button>
          {fileInfo?.url ? (
            <Box
              component="img"
              src={import.meta.env.VITE_SERVER_URL + fileInfo.url}
              width={250}
              height={250}
              sx={{ objectFit: 'contain', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px', overflow: 'hidden' }}
            />
          ) : null}
        </Box>
        <TextField margin="normal" required fullWidth label="Name" name="name" autoFocus defaultValue={achievement.name} />
        <TextField margin="normal" required fullWidth label="Type" name="type" defaultValue={achievement.type} />
        <TextField margin="normal" fullWidth label="Description" name="description" defaultValue={achievement.description} />
        <TextField
          margin="normal"
          fullWidth
          required
          label="Reward experience"
          name="rewardExperience"
          defaultValue={achievement.rewardExperience}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Reward coins"
          name="rewardCoins"
          defaultValue={achievement.rewardCoins}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Position"
          name="position"
          defaultValue={achievement.position}
          type="number"
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = EditAchievementPage;
export const action = updateAchievementAction;
export const loader = achievementLoader;
