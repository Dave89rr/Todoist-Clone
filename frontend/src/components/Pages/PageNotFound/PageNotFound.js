import classes from './PageNotFound.module.css';
import formClasses from '../../Forms/AuthForm.module.css';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.imgContainer}>
        <img
          className={classes.img}
          src="/static/images/404.png"
          alt="page not found"
        />
      </div>
      <h1>Hmmm, that page doesn't exist.</h1>
      <span>Get back to organizing work and life.</span>
      <div className={classes.btnHolder}>
        <button
          className={formClasses.formBtn}
          onClick={() => history.push('/')}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
