import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { thunkCreateProject } from '../../../store/projects';
import { signUp } from '../../../store/session';
import classes from '../AuthForm.module.css';
import signUpClasses from './SignUpForm.module.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [iconUrl, setIconUrl] = useState('/media/images/blankuser.png');
  const [theme, setTheme] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleStep1 = async (e) => {
    e.preventDefault();
    console.log(email);
    setUsername(email.split('@')[0]);
    console.log(username);
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email, password, iconUrl, theme)
      );
      if (data) {
        setErrors(data);
      } else {
        setFormStep(formStep + 1);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value.split('@')[0].slice(0, 12));
    setUsername(e.target.value.split('@')[0].slice(0, 12));
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (formStep > 4) {
    return <Redirect to="/" />;
  }

  const step1 = (
    <div className={signUpClasses.step1Container}>
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
      <input
        className={classes.userInput}
        type="text"
        name="username"
        onChange={updateUsername}
        value={username}
        style={{ display: 'none' }}
      />
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
        <button className={classes.formBtn} type="submit">
          Sign up with Email
        </button>
        <div className={classes.extraText}>
          <span>Already signed up?</span> <Link to="/login">Go to login</Link>
        </div>
      </div>
    </div>
  );
  let personal = {};
  let work;
  let education;
  if (user) {
    personal = {
      ownerId: user.id,
      name: 'Personal 🙂',
      color: '#808080',
      view: false,
    };
    work = {
      ownerId: user.id,
      name: 'Work 🎯',
      color: '#808080',
      view: false,
    };
    education = {
      ownerId: user.id,
      name: 'Education 📚',
      color: '#808080',
      view: false,
    };
  }
  const step2 = (
    <div className={signUpClasses.step2Container}>
      <div className={signUpClasses.step2TitleSection}>
        <span className={signUpClasses.step2Title}>
          How do you plan to use Machenist?
        </span>
        <span>Choose all that apply</span>
      </div>
      <div className={signUpClasses.usageContainer}>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(thunkCreateProject(personal));
          }}
          className={signUpClasses.usageOption}
        >
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
          onClick={(e) => {
            e.stopPropagation();
            dispatch(thunkCreateProject(work));
          }}
          className={signUpClasses.usageOption}
        >
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(thunkCreateProject(education));
          }}
          className={signUpClasses.usageOption}
        >
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
      <button
        onClick={(e) => {
          e.preventDefault();
          setFormStep(formStep + 1);
        }}
      >
        Next
      </button>
    </div>
  );
  const step3 = (
    <>
      <div>
        <label>Theme</label>
        <input
          type="checkbox"
          name="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setFormStep(formStep + 1);
        }}
      >
        Next
      </button>
    </>
  );
  const step4 = (
    <>
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
      <div>
        <label>Icon Url</label>
        <input
          type="text"
          name="icon_url"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
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
