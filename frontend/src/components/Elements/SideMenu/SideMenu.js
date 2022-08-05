import { useSelector } from 'react-redux';
import classes from './SideMenu.module.css';

const SideMenu = () => {
  const user = useSelector((state) => state.session.user);
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };
  return (
    <div className={classes.sideMenuContainer}>
      <div className={`${theme('Container')}`}>
        <div className={classes.sideInteractions}>
          <div className={classes.sideBtn}>
            <span>📥</span>
            <span>Inbox</span>
          </div>
          <div className={classes.sideBtn}>
            <span>📅</span>
            <span>Today</span>
          </div>
          <div className={classes.sideItem}>
            <span>V</span>
            <span>Projects</span>
            <div onClick={console.log('i was cliked')}>
              <img
                className={classes.addProjBtn}
                src="/static/icons/plus.svg"
                alt="add project button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
