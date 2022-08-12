import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './HomePage.module.css';
import formClasses from '../../Forms/AuthForm.module.css';

function Homepage() {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  if (user) {
    history.push('/today');
  }
  return (
    <div className={classes.homePageContainer}>
      <div className={classes.homePageHeader}>
        <h1>Organize your</h1>
        <h1>work and life, finally.</h1>
        <span>Become focused, organized, and calm with Machenist.</span>
      </div>
      <div className={classes.CTAcontainer}>
        <button
          className={formClasses.formBtn}
          onClick={() => history.push('/sign-up')}
        >
          Start for free
        </button>
      </div>
      <div className={classes.splash}>
        <div className={classes.sideImgContainer}>
          <div className={classes.sideIndivContainer}>
            <img
              className={classes.sideImg}
              src="/static/images/homepageimg-left.png"
              alt=""
            />
          </div>
          <div className={classes.centerImgContainer}>
            <img
              className={classes.centerImg}
              src="/static/images/mainimghome.png"
              alt=""
            />
          </div>
          <div className={classes.sideIndivContainer}>
            <img
              className={classes.sideImg}
              src="/static/images/homepageimg-right.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
