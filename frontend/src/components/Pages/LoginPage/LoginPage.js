import classes from './LoginPage.module.css';
import LoginForm from '../../Forms/LoginForm/';

function LoginPage() {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.innerContainer}>
        <h1>Login</h1>
        <LoginForm />
      </div>
      <div className={classes.secondContainer}>
        <img
          className={classes.imgLogin}
          src="/static/images/AuthFormImg.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default LoginPage;
