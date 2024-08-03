import { PricemeTaskItem } from '@core/priceme-tasks';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableTasksConfig } from './TableConfig';
import { tasksLoader } from './loader';

const TasksPage = () => {
  const { tasks } = useLoaderData() as { tasks: PricemeTaskItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={tasks}
        config={tableTasksConfig}
        listHeader={
          <CardHeader
            title="Priceme tasks"
            action={
              <Link href="/priceme/tasks/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = TasksPage;
export const loader = tasksLoader;
