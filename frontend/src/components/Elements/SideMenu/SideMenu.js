import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './SideMenu.module.css';
import { ReactComponent as InboxSvg } from './inbox.svg';
import { ReactComponent as CalendarSvg } from './calendar.svg';
import { ReactComponent as PlusSvg } from './plus.svg';

const SideMenu = ({ viewNewProjectForm, setViewNewProjectForm }) => {
  const user = useSelector((state) => state.session.user);
  const themeState = useSelector((state) => state.session.user.theme);
  const projects = useSelector((state) => state.projects);
  const history = useHistory();
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };
  let projArr;
  if (projects) {
    projArr = Object.values(projects);
  }
  return (
    <div className={classes.sideMenuContainer}>
      <div className={`${theme('Container')}`}>
        <div className={classes.sideInteractions}>
          <div
            className={classes.sideBtn}
            onClick={() => {
              history.push(`/projects/${projArr[0].id}`);
            }}
          >
            <InboxSvg fill={themeState ? '#5297ff' : '#416DB5'} />
            <span className={`${theme('SideBtnText')}`}>Inbox</span>
          </div>
          <div
            className={classes.sideBtn}
            onClick={() => {
              history.push('/today');
            }}
          >
            <CalendarSvg fill={themeState ? '#25b84c' : '#058527'} />
            <span className={`${theme('SideBtnText')}`}>Today</span>
          </div>
          <div className={`${classes.sideItem} ${classes.projectsItem}`}>
            <span className={`${theme('SideBtnText')}`}>Projects</span>
            <div
              className={`${theme('addProjBtn')}`}
              onClick={() => setViewNewProjectForm(!viewNewProjectForm)}
            >
              <PlusSvg fill={themeState ? '#9F9F9F' : '#666666'} />
              <div className={`${theme('Tooltip')}`}>
                <span>Add project</span>
              </div>
            </div>
          </div>
          {projArr &&
            projArr.map((project) => {
              if (project.name !== 'Inbox') {
                if (project.name.length <= 12) {
                  return (
                    <>
                      <div
                        className={`${classes.sideItem} ${theme(
                          'SideBtnText'
                        )}`}
                        key={project.id}
                        onClick={() => history.push(`/projects/${project.id}`)}
                      >
                        <div
                          className={classes.dot}
                          style={{ backgroundColor: `${project.color}` }}
                        ></div>{' '}
                        {project.name}
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div
                      className={`${classes.sideItem} ${theme('SideBtnText')}`}
                      key={project.id}
                      onClick={() => history.push(`/projects/${project.id}`)}
                    >
                      <div
                        className={classes.dot}
                        style={{ backgroundColor: `${project.color}` }}
                      ></div>
                      {`${project.name.slice(0, 12)}...`}
                    </div>
                  );
                }
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
