import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './components/Pages/LoginPage';
import TodayPage from './components/Pages/TodayPage';
import HomePage from './components/Pages/HomePage';
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
import SignUpPage from './components/Pages/SignUpPage';
import PageNotFound from './components/Pages/PageNotFound';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
  let start = 1;
  if (user) start = 3;
  return (
    <BrowserRouter>
      <NavBar
        setViewNewTaskForm={setViewNewTaskForm}
        viewNewTaskForm={viewNewTaskForm}
        setViewSideMenu={setViewSideMenu}
        viewSideMenu={viewSideMenu}
      />
      <div className={`${theme('siteContainer')}`}>
        <CSSTransition
          in={viewNewProjectForm}
          timeout={200}
          classNames={'newProjectForm'}
          unmountOnExit
        >
          <NewProjectForm setViewNewProjectForm={setViewNewProjectForm} />
        </CSSTransition>
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
            <SignUpPage start={start} />
          </Route>
          <ProtectedRoute path="/projects/:projectId" exact={true}>
            <ProjectView
              setViewNewTaskForm={setViewNewTaskForm}
              viewNewTaskForm={viewNewTaskForm}
              userProp={user}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/today" exact={true}>
            <TodayPage
              viewNewTaskForm={viewNewTaskForm}
              setViewNewTaskForm={setViewNewTaskForm}
              viewNewProjectForm={viewNewProjectForm}
              setViewNewProjectForm={setViewNewProjectForm}
            />
          </ProtectedRoute>
          {!user ? (
            <Route>
              <PageNotFound />
            </Route>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
