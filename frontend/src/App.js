import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './components/Pages/LoginPage';
import TodayPage from './components/Pages/TodayPage';
import HomePage from './components/Pages/HomePage';
import SignUpForm from './components/Forms/SignUpForm';
import NavBar from './components/Elements/NavBar';
import ProtectedRoute from './components/utils/ProtectedRoute';
import SideMenu from './components/Elements/SideMenu';
import { authenticate } from './store/session';
import { thunkGetAllTasks } from '../src/store/tasks';
import { thunkGetAllProjects } from '../src/store/projects';
import ProjectView from './components/Elements/ProjectView';
import NewProjectForm from './components/Forms/NewProjectForm';
import NewTaskForm from './components/Forms/NewTaskForm/';
import { CSSTransition } from 'react-transition-group';
import './index.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const [viewNewTaskForm, setViewNewTaskForm] = useState(false);
  const [viewNewProjectForm, setViewNewProjectForm] = useState(false);
  const [viewSideMenu, setViewSideMenu] = useState(true);

  let defaultId;
  if (projects) {
    defaultId = Object.keys(projects)[0];
  }

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(thunkGetAllProjects(user.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      dispatch(thunkGetAllTasks(user.id));
    }
  }, [dispatch, user]);
  if (!loaded) {
    return null;
  }
  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };

  return (
    <BrowserRouter>
      <NavBar
        setViewNewTaskForm={setViewNewTaskForm}
        viewNewTaskForm={viewNewTaskForm}
        setViewSideMenu={setViewSideMenu}
        viewSideMenu={viewSideMenu}
      />
      <div className={`${theme('siteContainer')}`}>
        {viewNewProjectForm ? (
          <NewProjectForm setViewNewProjectForm={setViewNewProjectForm} />
        ) : null}
        {viewNewTaskForm ? (
          <NewTaskForm
            defaultId={defaultId}
            setViewNewTaskForm={setViewNewTaskForm}
          />
        ) : null}
        {user && (
          <CSSTransition
            in={viewSideMenu}
            timeout={500}
            classNames={'sideMenu'}
            unmountOnExit
          >
            <SideMenu
              viewNewProjectForm={viewNewProjectForm}
              setViewNewProjectForm={setViewNewProjectForm}
            />
          </CSSTransition>
        )}
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/projects/:projectId" exact={true}>
            <ProjectView />
          </ProtectedRoute>
          <ProtectedRoute path="/today" exact={true}>
            <TodayPage
              viewNewTaskForm={viewNewTaskForm}
              setViewNewTaskForm={setViewNewTaskForm}
              viewNewProjectForm={viewNewProjectForm}
              setViewNewProjectForm={setViewNewProjectForm}
            />
          </ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
