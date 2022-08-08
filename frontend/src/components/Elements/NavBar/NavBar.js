import classes from './NavBar.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../LogoutButton/';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton/ProfileButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = ({
  setViewNewTaskForm,
  viewNewTaskForm,
  setViewSideMenu,
  viewSideMenu,
}) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
    return `${classes.navSplash}`;
  };

  const home = <img src="/static/icons/home.svg" alt="" />;
  const menuIcon = <img src="/static/icons/menu.svg" alt="" />;
  const logoLoggedout = (
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
  return (
    <nav className={`${theme('Nav')}`}>
      <div className={classes.container}>
        {!user ? logoLoggedout : logoLoggedIn}
        {!user ? (
          <div className={classes.userInteractions}>
            <div>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
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
            </div>
            <ProfileButton />
            <div>
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
