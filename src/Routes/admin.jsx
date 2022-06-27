import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import PrivateRoute from 'Routes/PrivateRoutes';
import Layout from 'Components/Layout';
import SuperAdmins from 'Components/SuperAdmin/SuperAdmins';
import SuperAdminsForm from 'Components/SuperAdmin/SuperAdmins/Form';
import Admins from 'Components/SuperAdmin/Admins';
import AdminsForm from 'Components/SuperAdmin/Admins/Form';
import Employees from 'Components/SuperAdmin/Employees';
import EmployeesForm from 'Components/SuperAdmin/Employees/Form';
import Tasks from 'Components/SuperAdmin/Tasks';
import TasksForm from 'Components/SuperAdmin/Tasks/Form';
import Projects from 'Components/SuperAdmin/Projects';
import ProjectsForm from 'Components/SuperAdmin/Projects/Form';
import TimeSheets from 'Components/SuperAdmin/TimeSheet';
import TimeSheetsForm from 'Components/SuperAdmin/TimeSheet/Form';

const adminRoutes = [
  { path: '/super-admin/admins', name: 'Admins' },
  { path: '/super-admin/super-admins', name: 'Super-admins' },
  { path: '/super-admin/employees', name: 'Employees' },
  { path: '/super-admin/projects', name: 'Projects' },
  { path: '/super-admin/time-sheets', name: 'Time-sheets' },
  { path: '/super-admin/tasks', name: 'Tasks' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();

  return (
    <Layout routes={adminRoutes}>
      <Switch>
        <PrivateRoute path={`${url}/super-admins`} component={SuperAdmins} />
        <PrivateRoute path={`${url}/super-admins/form`} component={SuperAdminsForm} />
        <PrivateRoute path={`${url}/admins`} component={Admins} />
        <PrivateRoute path={`${url}/admins/form`} component={AdminsForm} />
        <PrivateRoute path={`${url}/employees`} component={Employees} />
        <PrivateRoute path={`${url}/employees/form`} component={EmployeesForm} />
        <PrivateRoute path={`${url}/projects`} component={Projects} />
        <PrivateRoute path={`${url}/projects/form`} component={ProjectsForm} />
        <PrivateRoute path={`${url}/time-sheets`} component={TimeSheets} />
        <PrivateRoute path={`${url}/time-sheets/form`} component={TimeSheetsForm} />
        <PrivateRoute path={`${url}/tasks`} component={Tasks} />
        <PrivateRoute path={`${url}/tasks/form`} component={TasksForm} />
        <Redirect to={`${url}/admins`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
