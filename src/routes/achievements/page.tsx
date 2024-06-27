import { AchievementItem } from '@core/achievements';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableAchievementsConfig } from './TableConfig';
import { achievementsLoader } from './loader';

const AchievementsPage = () => {
  const { achievements } = useLoaderData() as { achievements: AchievementItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={achievements}
        config={tableAchievementsConfig}
        listHeader={
          <CardHeader
            title="Achievements"
            action={
              <Link href="/achievements/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = AchievementsPage;
export const loader = achievementsLoader;
