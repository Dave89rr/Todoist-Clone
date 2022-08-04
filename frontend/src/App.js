import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './components/Pages/LoginPage';
import TodayPage from './components/Pages/TodayPage';
import HomePage from './components/Pages/HomePage';
import SignUpForm from './components/Forms/SignUpForm';
import NavBar from './components/Elements/NavBar';
import ProtectedRoute from './components/utils/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { thunkGetAllTasks } from '../src/store/tasks';
import { thunkGetAllProjects } from '../src/store/projects';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

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

  return (
    <BrowserRouter>
      <NavBar />
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
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/today" exact={true}>
          <TodayPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
