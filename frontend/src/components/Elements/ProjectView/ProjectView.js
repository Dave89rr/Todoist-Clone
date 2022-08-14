import classes from './ProjectView.module.css';
import EditProjectForm from '../../Forms/EditProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteTasksByProjId } from '../../../store/tasks';
import { thunkDeleteProject } from '../../../store/projects';
import { useEffect, useState } from 'react';
import TaskView from '../TaskView/TaskView';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as PlusSvg } from '../SideMenu/plus.svg';
import { ReactComponent as EditIcon } from '../TaskView/editicon.svg';
import { ReactComponent as TrashIcon } from '../TaskView/trashcan.svg';

function ProjectView({ viewNewTaskForm, setViewNewTaskForm, userProp }) {
  const { projectId } = useParams();
  const [viewEditProject, setViewEditProject] = useState(false);
  const project = useSelector((state) => state.projects[projectId]);
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = userProp;

  useEffect(() => {
    async function findProject() {
      const response = await fetch(`/api/projects/${projectId}`);

      if (response.ok) {
        const { project } = await response.json();
        if (!project[0]) {
          return history.push('/');
        }
        if (id) {
          if (project[0].ownerId !== id) history.push('/');
        }
      } else {
        return history.push('/');
      }
    }
    findProject();
  }, [projectId, history, id]);
  let incompleteTaskArr;
  let completedTaskArr;
  if (tasks) {
    incompleteTaskArr = Object.values(tasks).filter((task) => !task.completed);
    completedTaskArr = Object.values(tasks).filter((task) => task.completed);
  }
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };
  const projActions = (
    <div className={classes.projActions}>
      <div className={classes.projManipulate}>
        <div className={`${theme('UserInteractionBtn')}`}>
          <EditIcon
            fill={user.theme ? '#9D9D9D' : '#808080'}
            stroke={user.theme ? '#9D9D9D' : '#808080'}
            onClick={() => setViewEditProject(!viewEditProject)}
          />
        </div>
        <div className={`${theme('UserInteractionBtn')}`}>
          <TrashIcon
            fill={user.theme ? '#9D9D9D' : '#808080'}
            stroke={user.theme ? '#9D9D9D' : '#808080'}
            onClick={() => {
              dispatch(thunkDeleteProject(project.id));
              dispatch(actionDeleteTasksByProjId(project.id));
            }}
          />
        </div>
      </div>
    </div>
  );
  if (!project) return null;
  return (
    <div className={classes.mainContainer}>
      <div className={classes.projectContainer}>
        <CSSTransition
          timeout={100}
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
          {incompleteTaskArr.map((task) => {
            if (task.projectId === project.id) {
              return <TaskView task={task} key={task.id} />;
            }
            return null;
          })}
          {completedTaskArr.map((task) => {
            if (task.projectId === project.id) {
              return <TaskView task={task} key={task.id} />;
            }
            return null;
          })}

          <div
            className={`${theme('TaskContainer')}`}
            onClick={() => setViewNewTaskForm(!viewNewTaskForm)}
          >
            <PlusSvg fill="#DD4B39" height="24px" />
            <span className={`${theme('TaskTitle')}`}>Add task</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
