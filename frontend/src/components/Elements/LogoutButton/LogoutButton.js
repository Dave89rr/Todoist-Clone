import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import { actionLogoutTasks } from '../../../store/tasks';
import { actionLogoutProjects } from '../../../store/projects';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(actionLogoutProjects());
    dispatch(actionLogoutTasks());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
