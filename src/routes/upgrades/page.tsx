import { UpgradeItem } from '@core/upgrades';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableUpgradesConfig } from './TableConfig';
import { upgradesLoader } from './loader';

const UpgradesPage = () => {
  const { upgrades } = useLoaderData() as { upgrades: UpgradeItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={upgrades}
        config={tableUpgradesConfig}
        listHeader={
          <CardHeader
            title="Upgrades"
            action={
              <Link href="/upgrades/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = UpgradesPage;
export const loader = upgradesLoader;
