import classes from './NavBar.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton/ProfileButton';
import { useHistory } from 'react-router-dom';
import authClasses from '../../Forms/AuthForm.module.css';
import { login } from '../../../store/session';

const NavBar = ({
  setViewNewTaskForm,
  viewNewTaskForm,
  setViewSideMenu,
  viewSideMenu,
}) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
    return `${classes.navSplash}`;
  };

  const home = <img src="/static/icons/home.svg" alt="" />;
  const menuIcon = <img src="/static/icons/menu.svg" alt="" />;
  const logoLoggedout = (
    <div className={classes.leftContainer}>
      <div
        className={classes.logoContainer}
        onClick={() => {
          history.push('/');
        }}
      >
        <img
          className={classes.logo}
          src="/static/icons/machenist-logo.svg"
          alt="app icon"
        />
        <span>machenist</span>
      </div>
      <div
        className={classes.login}
        onClick={() => {
          window.open('https://github.com/dave89rr/', '_blank');
        }}
      >
        <span>About</span>
      </div>
    </div>
  );

  const logoLoggedIn = (
    <div className={classes.logoContainer}>
      <div
        className={classes.menuIcon}
        onClick={() => setViewSideMenu(!viewSideMenu)}
      >
        {menuIcon}
      </div>
      <div className={classes.homeIcon} onClick={() => history.push('/today')}>
        {home}
      </div>
    </div>
  );
  const handleDemoLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'));
  };
  return (
    <nav className={`${theme('Nav')}`}>
      <div className={classes[user ? 'loggedIncontainer' : 'container']}>
        {!user ? logoLoggedout : logoLoggedIn}
        {!user ? (
          <div className={classes.loggedOutuserInteractions}>
            <div className={classes.login} onClick={handleDemoLogin}>
              <span>Demo</span>
            </div>
            <div
              className={classes.login}
              onClick={() => history.push('/login')}
            >
              <span>Login</span>
            </div>
            <div className={classes.signUpContainer}>
              <button
                onClick={() => history.push('/sign-up')}
                className={authClasses.formBtn}
                style={{ marginTop: '0' }}
              >
                Start for free
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.userInteractions}>
            <div
              className={classes.addTaskContainer}
              onClick={() => setViewNewTaskForm(!viewNewTaskForm)}
            >
              <img
                className={classes.addTask}
                src="/static/icons/plus.svg"
                alt="add task icon"
              />
              <div className={`${theme('Tooltip')}`}>
                <span>Add task</span>
              </div>
            </div>
            <ProfileButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
