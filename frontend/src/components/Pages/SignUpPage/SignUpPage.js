import classes from './SignUpPage.module.css';
import SignUpForm from '../../Forms/SignUpForm';

function SignUpPage() {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.workableArea}>
        <div className={classes.upperContainer}>
          <img
            style={{ height: '50px' }}
            src="static/icons/machenist-logo.svg"
            alt="logo"
          />
          <span>machenist</span>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
