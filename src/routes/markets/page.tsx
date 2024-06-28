import { MarketItem } from '@core/markets';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableMarketsConfig } from './TableConfig';
import { marketsLoader } from './loader';

const MarketsPage = () => {
  const { markets } = useLoaderData() as { markets: MarketItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={markets}
        config={tableMarketsConfig}
        listHeader={
          <CardHeader
            title="Markets"
            action={
              <Link href="/markets/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = MarketsPage;
export const loader = marketsLoader;
