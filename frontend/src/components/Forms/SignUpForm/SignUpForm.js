import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { thunkCreateProject } from '../../../store/projects';
import { signUp, updateUserTheme } from '../../../store/session';
import classes from '../AuthForm.module.css';
import signUpClasses from './SignUpForm.module.css';
import { ReactComponent as Checkmark } from './machenist-logo.svg';

const SignUpForm = ({ start }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [iconUrl, setIconUrl] = useState('');
  const [theme, setTheme] = useState(false);
  const [formStep, setFormStep] = useState(start);
  const [personalCreated, setPersonalCreated] = useState(false);
  const [workCreated, setWorkCreated] = useState(false);
  const [educationCreated, setEducationCreated] = useState(false);
  const [workFill, setWorkFill] = useState('white');
  const [personalFill, setPersonalFill] = useState('white');
  const [educationFill, setEducationFill] = useState('white');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleStep1 = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      let ranUserName = Math.random();
      ranUserName = (ranUserName * 100000000000000).toString().slice(0, 11);
      const data = await dispatch(
        signUp(
          ranUserName,
          email,
          password,
          '/static/images/blankuser.png',
          theme
        )
      );
      if (data) {
        setErrors(data);
      } else {
        setErrors([]);
        setFormStep(formStep + 1);
      }
    } else {
      setErrors(["Passwords don't match"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length >= 1 || e.target.value.length <= 12) {
      setErrors([]);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === repeatPassword) {
      setErrors([]);
    }
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    if (
      password.length === e.target.value.length &&
      password !== e.target.value
    ) {
      setErrors(["Passwords don't match"]);
    } else {
      setErrors([]);
    }
  };

  if (formStep > 4) {
    return <Redirect to="/" />;
  }

  const step1 = (
    <div className={signUpClasses.step1Container}>
      <div className={signUpClasses.secondContainer}>
        <h1>Sign Up</h1>

        <div className={classes.inputContainer}>
          <input
            className={classes.userInput}
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required
          />
          <label className={email && classes.filled}>Email</label>
        </div>
        <div className={classes.inputContainer}>
          <input
            className={classes.userInput}
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required
          ></input>
          <label className={password && classes.filled}>Password</label>
        </div>
        <div className={classes.inputContainer}>
          <input
            className={classes.userInput}
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <label className={repeatPassword && classes.filled}>
            Repeat Password
          </label>
        </div>
        <div>
          <button
            className={classes.formBtn}
            type="submit"
            disabled={
              email.length < 1 ||
              email.length > 40 ||
              password.length < 1 ||
              password.length > 60 ||
              repeatPassword.length !== password.length ||
              password !== repeatPassword
                ? true
                : false
            }
          >
            Sign up with Email
          </button>
          <div className={classes.extraText}>
            <span>Already signed up?</span> <Link to="/login">Go to login</Link>
          </div>
        </div>
      </div>
      <div className={signUpClasses.signUpImgContainer}>
        <img
          className={signUpClasses.imgSignUP}
          src="/static/images/AuthFormImg.png"
          alt=""
        />
      </div>
    </div>
  );
  let personal = {};
  let work;
  let education;
  if (user) {
    personal = {
      ownerId: user.id,
      name: 'Personal 😄',
      color: '#FF9933',
      view: false,
    };
    work = {
      ownerId: user.id,
      name: 'Work 🎯',
      color: '#DB4035',
      view: false,
    };
    education = {
      ownerId: user.id,
      name: 'Education 📚',
      color: '#299438',
      view: false,
    };
  }

  const handlePersonalCreation = () => {
    if (!personalCreated) {
      dispatch(thunkCreateProject(personal));
    }
    setPersonalCreated(true);
    setPersonalFill('#e44332');
  };
  const handleEducationCreation = () => {
    if (!educationCreated) {
      dispatch(thunkCreateProject(education));
    }
    setEducationCreated(true);
    setEducationFill('#e44332');
  };

  const handleWorkCreation = () => {
    if (!workCreated) {
      dispatch(thunkCreateProject(work));
    }
    setWorkCreated(true);
    setWorkFill('#e44332');
  };
  const step2 = (
    <div className={signUpClasses.step2Container}>
      <div className={signUpClasses.stepTitleSection}>
        <span className={signUpClasses.stepTitle}>
          How do you plan to use Machenist?
        </span>
        <span>Choose all that apply</span>
      </div>
      <div className={signUpClasses.usageContainer}>
        <div
          onClick={(e) => handlePersonalCreation()}
          className={signUpClasses.usageOption}
          onMouseEnter={() => {
            if (!personalCreated) {
              setPersonalFill('#b17b75');
            }
          }}
          onMouseLeave={() => {
            if (!personalCreated) {
              setPersonalFill('white');
            }
          }}
        >
          <div className={signUpClasses.checkContainer}>
            <Checkmark fill={personalFill} />
          </div>
          <div className={signUpClasses.usageImgContainer}>
            <img
              className={signUpClasses.usageImg}
              src="https://d3ptyyxy2at9ui.cloudfront.net/assets/images/a44738d5f7fb0d68cfab25ac6ad6e17f.png"
              alt=""
            />
          </div>
          <span>Personal</span>
        </div>
        <div
          onClick={(e) => handleWorkCreation()}
          className={signUpClasses.usageOption}
          onMouseEnter={() => {
            if (!workCreated) {
              setWorkFill('#b17b75');
            }
          }}
          onMouseLeave={() => {
            if (!workCreated) {
              setWorkFill('white');
            }
          }}
        >
          <div className={signUpClasses.checkContainer}>
            <Checkmark fill={workFill} />
          </div>
          <div className={signUpClasses.usageImgContainer}>
            <img
              className={signUpClasses.usageImg}
              src="https://d3ptyyxy2at9ui.cloudfront.net/assets/images/094e1b7ba10f2b0dac09050a43e74f4c.png"
              alt=""
            />
          </div>
          <span>Work</span>
        </div>
        <div
          onClick={(e) => handleEducationCreation()}
          className={signUpClasses.usageOption}
          onMouseEnter={() => {
            if (!educationCreated) {
              setEducationFill('#b17b75');
            }
          }}
          onMouseLeave={() => {
            if (!educationCreated) {
              setEducationFill('white');
            }
          }}
        >
          <div className={signUpClasses.checkContainer}>
            <Checkmark fill={educationFill} />
          </div>
          <div className={signUpClasses.usageImgContainer}>
            <img
              className={signUpClasses.usageImg}
              src="https://d3ptyyxy2at9ui.cloudfront.net/assets/images/655e59f84581a3ee7ba6dd1b998a3a4b.png"
              alt=""
            />
          </div>
          <span>Education</span>
        </div>
      </div>
      <div className={signUpClasses.tip}>
        <span>
          Please answer two quick questions to ensure you'll have a great start
          with Machenist. 😀
        </span>
      </div>
      <div className={signUpClasses.nextBtnHolder}>
        <button
          className={classes.formBtn}
          onClick={() => {
            setFormStep(formStep + 1);
          }}
        >
          {personalCreated || workCreated || educationCreated ? 'Next' : 'Skip'}
        </button>
      </div>
    </div>
  );
  const updateUser = user;
  const step3 = (
    <>
      <div className={signUpClasses.stepTitleSection}>
        <span className={signUpClasses.stepTitle}>
          Which theme would you like to start off with?
        </span>
        <span style={{ marginBottom: '0%' }}>
          {theme
            ? 'If once you start down the dark path, forever will it dominate your destiny. Consume you, it will.'
            : 'The light blinds us. It is only in the dark that we see clearly...'}
        </span>
        <span>{theme ? '-Yoda' : '-Darth Revan'}</span>
      </div>
      <div className={signUpClasses.themeContainer}>
        <div
          onClick={() => {
            updateUser.theme = false;
            dispatch(updateUserTheme(updateUser));
            setTheme(false);
          }}
          className={`${signUpClasses.lightTheme} ${
            !theme ? signUpClasses.selected : null
          }`}
        >
          <img
            className={signUpClasses.img}
            src="/static/images/machenist-light.png"
            alt=""
          />
          <span>Light</span>
        </div>
        <div
          onClick={() => {
            updateUser.theme = true;
            dispatch(updateUserTheme(updateUser));
            setTheme(true);
          }}
          className={`${signUpClasses.darkTheme} ${
            theme ? signUpClasses.selected : null
          }`}
        >
          <img
            className={signUpClasses.img}
            src="/static/images/machenist-dark.png"
            alt=""
          />
          <span>Dark</span>
        </div>
      </div>
      <div className={signUpClasses.nextBtnHolder}>
        <button
          className={classes.formBtn}
          onClick={(e) => {
            e.preventDefault();
            setFormStep(formStep + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
  const handleUserNameUpdate = async (e) => {
    e.preventDefault();
    const userUpdt = { ...user };
    userUpdt.username = username;
    const data = await dispatch(updateUserTheme(userUpdt));

    if (data) {
      setErrors(data);
    } else {
      setFormStep(formStep + 1);
    }
  };
  const step4 = (
    <>
      <div
        style={{ marginTop: '15%' }}
        className={signUpClasses.stepTitleSection}
      >
        <span className={signUpClasses.stepTitle}>
          Lastly, what shall we call you?
        </span>
      </div>
      <div className={signUpClasses.userNameInputContainer}>
        <div className={classes.inputContainer}>
          <input
            className={classes.userInput}
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          />
          <label className={username && classes.filled}>User Name</label>
        </div>
        {/* <div>
        <label>Icon Url</label>
        <input
        type="text"
        name="icon_url"
        value={iconUrl}
        onChange={(e) => setIconUrl(e.target.value)}
        />
      </div> */}
        <button
          className={classes.formBtn}
          onClick={handleUserNameUpdate}
          disabled={
            username.length < 1 || username.length > 12 || errors.length > 0
              ? true
              : false
          }
        >
          Launch Machenist
        </button>
      </div>
    </>
  );
  return (
    <>
      <form className={classes.form} onSubmit={handleStep1}>
        <div className={classes.errorContainer}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        {formStep === 1 ? step1 : null}
      </form>
      {formStep === 2 ? step2 : null}
      {formStep === 3 ? step3 : null}
      {formStep === 4 ? step4 : null}
    </>
  );
};

export default SignUpForm;
