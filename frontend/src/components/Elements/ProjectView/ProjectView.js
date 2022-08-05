import classes from './ProjectView.module.css';
import EditProjectForm from '../../Forms/EditProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteTasksByProjId } from '../../../store/tasks';
import { thunkDeleteProject } from '../../../store/projects';
import { useState } from 'react';
import TaskView from '../TaskView/TaskView';

function ProjectView({ project, taskArr }) {
  const [viewEditProject, setViewEditProject] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };

  return (
    <div key={project.id} className={classes.projContainer}>
      <div className={classes.projTitle}>
        <span className={`${theme('ProjHeader')}`}>{project.name}</span>
        <div className={classes.projActions}>
          <span>
            <button
              onClick={() => {
                dispatch(thunkDeleteProject(project.id));
                dispatch(actionDeleteTasksByProjId(project.id));
              }}
            >
              Del Proj
            </button>
            <button onClick={() => setViewEditProject(!viewEditProject)}>
              Edit Project
            </button>{' '}
          </span>
        </div>
      </div>
      {viewEditProject && <EditProjectForm projectProp={project} />}
      {taskArr.map((task) => {
        if (task.projectId === project.id) {
          return <TaskView task={task} />;
        }
        return null;
      })}
    </div>
  );
}

export default ProjectView;
