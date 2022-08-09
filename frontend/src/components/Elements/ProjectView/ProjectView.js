import classes from './ProjectView.module.css';
import EditProjectForm from '../../Forms/EditProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteTasksByProjId } from '../../../store/tasks';
import { thunkDeleteProject } from '../../../store/projects';
import { useState } from 'react';
import TaskView from '../TaskView/TaskView';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { CSSTransition } from 'react-transition-group';

function ProjectView() {
  const { projectId } = useParams();
  const [viewEditProject, setViewEditProject] = useState(false);
  const project = useSelector((state) => state.projects[projectId]);
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let taskArr;
  if (tasks) {
    taskArr = Object.values(tasks);
  }
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };
  const projActions = (
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
  );
  if (!project) return null;
  return (
    <div className={classes.mainContainer}>
      <div className={classes.projectContainer}>
        <CSSTransition
          in={viewEditProject}
          classNames={{
            enterActive: classes.editFormEnterActive,
            enterDone: classes.editFormEnter,
            exitActive: classes.editFormExitActive,
            exit: classes.editFormExit,
          }}
          unmountOnExit
        >
          <EditProjectForm
            projectProp={project}
            setViewEditProject={setViewEditProject}
          />
        </CSSTransition>
        <div key={project.id} className={classes.projContainer}>
          <div className={classes.projTitle}>
            <span className={`${theme('ProjHeader')}`}>{project.name}</span>
            {project.name !== 'Inbox' ? projActions : null}
          </div>
          {taskArr.map((task) => {
            if (task.projectId === project.id) {
              return <TaskView task={task} key={task.id} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
