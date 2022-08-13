import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ProjectSelector.module.css';
import { ReactComponent as InboxSvg } from '../SideMenu/inbox.svg';

const ProjectSelector = ({ handleProjIdChange, projectId }) => {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const projArr = Object.values(projects);

  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
  return (
    <div
      onClick={() => setOptionsVisible(true)}
      className={classes[`${theme('ButtonShape')}`]}
    >
      {projects && projects[projectId].name !== 'Inbox' ? (
        <>
          <div
            className={classes.dot}
            style={{ backgroundColor: projects[projectId].color }}
          ></div>
          <span>{projects[projectId].name}</span>
        </>
      ) : (
        <>
          <InboxSvg
            fill={true ? '#5297ff' : '#416DB5'}
            style={{ minWidth: '24px', minHeight: '24px' }}
          />
          <span>{projects[projectId].name}</span>
        </>
      )}
      {optionsVisible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
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
                  data-value={project.id}
                  onClick={(e) => handleProjIdChange(e)}
                >
                  {project.name !== 'Inbox' ? (
                    <div
                      className={classes.dotDropdown}
                      style={{ backgroundColor: project.color }}
                    ></div>
                  ) : (
                    <InboxSvg
                      fill={true ? '#5297ff' : '#416DB5'}
                      style={{
                        paddingLeft: '0',
                        marginLeft: '0',
                      }}
                    />
                  )}
                  <span style={{ pointerEvents: 'none' }}>{project.name}</span>
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
