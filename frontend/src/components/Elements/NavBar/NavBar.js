import classes from './NavBar.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../LogoutButton/';
import { useSelector } from 'react-redux';

const NavBar = ({ setViewNewTaskForm, viewNewTaskForm }) => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
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
          <>
            <button onClick={() => setViewNewTaskForm(!viewNewTaskForm)}>
              New Task
            </button>
            <div>
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
