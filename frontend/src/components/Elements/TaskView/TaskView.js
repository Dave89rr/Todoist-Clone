import classes from './TaskView.module.css';
import EditTaskForm from '../../Forms/EditTaskForm';
import { thunkDeleteTask, thunkUpdateTask } from '../../../store/tasks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as EditIcon } from './editicon.svg';
import { ReactComponent as TrashIcon } from './trashcan.svg';
import Checkbox from '../Checkbox';

function TaskView({ task }) {
  const [showtaskUserInteractions, setShowtaskUserInteractions] =
    useState(false);
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [viewEditTask, setViewEditTask] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };
  const handleDone = () => {
    const updateTaskCompleted = { ...task };
    updateTaskCompleted.completed = !task.completed;

    dispatch(thunkUpdateTask(updateTaskCompleted));
  };
  const now = new Date();
  return (
    <div
      key={task.id}
      className={`${theme('TaskContainer')}`}
      onMouseEnter={() => setShowtaskUserInteractions(true)}
      onMouseLeave={() => setShowtaskUserInteractions(false)}
    >
      <div className={classes.infoContainer}>
        <div className={`${theme('TaskInfo')}`}>
          <div className={classes.leftContainer}>
            <Checkbox
              completed={task.completed}
              handleDone={handleDone}
              priority={parseInt(task.priority)}
              theme={user.theme}
            />
            {task.completed ? (
              <span className={`${theme('TaskTitleDone')}`}>{task.name}</span>
            ) : (
              <span className={`${theme('TaskTitle')}`}>{task.name}</span>
            )}
          </div>
          <div className={classes.taskUserInteractions}>
            {showtaskUserInteractions && (
              <div className={classes.taskManipulate}>
                <div className={`${theme('UserInteractionBtn')}`}>
                  <EditIcon
                    fill={user.theme ? '#9D9D9D' : '#808080'}
                    stroke={user.theme ? '#9D9D9D' : '#808080'}
                    onClick={() => setViewEditTask(!viewEditTask)}
                  />
                </div>
                <div className={`${theme('UserInteractionBtn')}`}>
                  <TrashIcon
                    fill={user.theme ? '#9D9D9D' : '#808080'}
                    stroke={user.theme ? '#9D9D9D' : '#808080'}
                    onClick={() => dispatch(thunkDeleteTask(task.id))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {task.description.length > 0 && (
          <div className={classes.descripContainer}>
            <span>{task.description}</span>
          </div>
        )}
        <div className={`${theme('TaskLowerInfo')}`}>
          <span
            className={now > new Date(task.due_date) ? classes.overdue : null}
          >
            {new Date(task.due_date)
              .toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
              .split(' ')
              .slice(0, 2)
              .join(' ')}
            {' · '}
            {new Date(task.due_date)
              .toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
              .split(' ')
              .slice(3, 7)
              .join(' ')}
          </span>
          {Object.values(projects).length && location.pathname === '/today' ? (
            <div
              onClick={() => {
                history.push(`/projects/${task.projectId}`);
              }}
              className={classes.projectNameContainer}
            >
              <span style={{ cursor: 'pointer' }}>
                {projects[task.projectId].name}
              </span>
              <div
                className={classes.littleCircle}
                style={{
                  backgroundColor: `${projects[task.projectId].color}`,
                }}
              ></div>
            </div>
          ) : null}
        </div>
      </div>
      {viewEditTask && (
        <div className={classes.editForm}>
          <EditTaskForm taskProp={task} setViewEditTask={setViewEditTask} />
        </div>
      )}
    </div>
  );
}

export default TaskView;
