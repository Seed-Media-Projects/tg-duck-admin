import { MarketLvlItem } from '@core/market-lvls';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData, useParams } from 'react-router-dom';
import { tableMarketLvlsConfig } from './TableConfig';
import { marketLvlsLoader } from './loader';

const MarketLvlsPage = () => {
  const { marketLvls } = useLoaderData() as { marketLvls: MarketLvlItem[] };
  const { marketId } = useParams();

  return (
    <Grid item xs={12}>
      <BaseList
        data={marketLvls}
        config={tableMarketLvlsConfig}
        listHeader={
          <CardHeader
            title="Market Lvls"
            action={
              <Link href={`/markets/${marketId}/lvls/create`}>
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = MarketLvlsPage;
export const loader = marketLvlsLoader;
