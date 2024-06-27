import { SpecialItem } from '@core/specials';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableSpecialsConfig } from './TableConfig';
import { specialsLoader } from './loader';

const SpecialsPage = () => {
  const { specials } = useLoaderData() as { specials: SpecialItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={specials}
        config={tableSpecialsConfig}
        listHeader={
          <CardHeader
            title="Specials"
            action={
              <Link href="/specials/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = SpecialsPage;
export const loader = specialsLoader;
