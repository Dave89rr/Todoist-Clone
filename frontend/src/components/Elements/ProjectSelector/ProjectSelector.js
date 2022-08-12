import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ProjectSelector.module.css';
import { ReactComponent as InboxSvg } from '../SideMenu/inbox.svg';

const ProjectSelector = ({ recentProjId, handleProjIdChange }) => {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const projArr = Object.values(projects);

  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
  const thisProj = projects[recentProjId];
  return (
    <div
      onClick={() => setOptionsVisible(true)}
      className={classes[`${theme('ButtonShape')}`]}
    >
      <span>{thisProj.name}</span>{' '}
      {thisProj.name === 'Inbox' ? (
        <InboxSvg fill={true ? '#5297ff' : '#416DB5'} />
      ) : null}
      {optionsVisible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log('modal was clicked');
            setOptionsVisible(false);
          }}
          className={classes.optionModalBg}
        >
          <div className={classes[`${theme('Options')}`]}>
            {projArr.map((project, id) => {
              return (
                <div
                  className={classes[`${theme('Option')}`]}
                  key={id}
                  value={project.id}
                >
                  <span>{project.name}</span>
                  {project.name === 'Inbox' ? (
                    <InboxSvg fill={true ? '#5297ff' : '#416DB5'} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
