import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import classes from '../AuthForm.module.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 60) {
      setPasswordErrors(['Password must be at most 60 characters long']);
    } else {
      setPasswordErrors([]);
    }
  };

  if (user) {
    return <Redirect to="/today" />;
  }

  return (
    <>
      <form className={classes.form} onSubmit={onLogin}>
        <div className={classes.errorContainer}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
          {passwordErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className={classes.inputContainer}>
          <input
            className={classes.userInput}
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />
          <label className={email && classes.filled} htmlFor="email">
            Email
          </label>
        </div>
        <div className={classes.inputContainer}>
          <input
            className={classes.userInput}
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
          <label className={password && classes.filled} htmlFor="password">
            Password
          </label>
        </div>
        <button
          className={classes.formBtn}
          type="submit"
          disabled={
            email.length < 1 ||
            email.length > 40 ||
            password.length < 8 ||
            password.length > 60
              ? true
              : false
          }
        >
          Log in
        </button>
      </form>
      <div className={classes.extraText}>
        <span>Don't have an account?</span> <Link to="/sign-up">Sign Up</Link>
      </div>
    </>
  );
};

export default LoginForm;
