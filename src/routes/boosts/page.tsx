import { BoostItem } from '@core/boosts';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableBoostsConfig } from './TableConfig';
import { boostsLoader } from './loader';

const BoostsPage = () => {
  const { boosts } = useLoaderData() as { boosts: BoostItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={boosts}
        config={tableBoostsConfig}
        listHeader={
          <CardHeader
            title="Boosts"
            action={
              <Link href="/boosts/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = BoostsPage;
export const loader = boostsLoader;
