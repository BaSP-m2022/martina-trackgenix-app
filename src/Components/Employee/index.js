// import React, { lazy, Suspense } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import styles from 'Components/SuperAdmin/superAdmin.module.css';
// import NavBar from 'Components/Shared/NavBar/NavBar';
// import Footer from 'Components/Shared/Footer';

// const Home = lazy(() => import('Components/Employee/Home/index'));
// const Projects = lazy(() => import('Components/Employee/Projects/index'));
// const EmployeeProfile = lazy(() => import('Components/Employee/Profile/index'));
// const TimeSheet = lazy(() => import('Components/Employee/TimeSheet/index'));
// const SignUpEmployee = lazy(() => import('Components/Auth/Sign-up/index'));

// function EmployeeLayout() {
//   const arrayRoute = [
//     { path: '/employee/profile', name: 'Profile' },
//     { path: '/employee/projects', name: 'Projects' },
//     { path: '/employee/time-sheets', name: 'Time-sheets' }
//   ];
//   return (
//     <div className={styles.container}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <NavBar props={arrayRoute} />
//         <Switch>
//           <Route path="/employee/home" component={Home} />
//           <Route path="/employee/projects" component={Projects} />
//           <Route path="/employee/time-sheets" component={TimeSheet} />
//           <Route path="/employee/profile" component={EmployeeProfile} />
//           <Route path="/employee/sign-up" component={SignUpEmployee} />
//           <Route exact path="/employee/">
//             <Redirect to="/employee/home" />
//           </Route>
//         </Switch>
//         <Footer props={arrayRoute} />
//       </Suspense>
//     </div>
//   );
// }

// export default EmployeeLayout;
