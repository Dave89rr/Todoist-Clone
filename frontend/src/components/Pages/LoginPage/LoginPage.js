import classes from './LoginPage.module.css';
import LoginForm from '../../Forms/LoginForm/';

function LoginPage() {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.innerContainer}>
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
