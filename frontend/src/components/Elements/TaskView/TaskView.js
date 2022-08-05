import classes from './TaskView.module.css';
import EditTaskForm from '../../Forms/EditTaskForm';
import { thunkDeleteTask } from '../../../store/tasks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TaskView({ task }) {
  const [showtaskUserInteractions, setShowtaskUserInteractions] =
    useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [viewEditTask, setViewEditTask] = useState(false);

  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };

  return (
    <div
      key={task.id}
      className={classes.taskContainer}
      onMouseEnter={() => setShowtaskUserInteractions(true)}
      onMouseLeave={() => setShowtaskUserInteractions(false)}
    >
      <div className={classes.taskTitle}>
        <input type="checkbox"></input>
        <span className={`${theme('TaskTitle')}`}>{task.name}</span>
      </div>
      <div className={classes.taskUserInteractions}>
        {showtaskUserInteractions && (
          <span>
            <button onClick={() => dispatch(thunkDeleteTask(task.id))}>
              Delete
            </button>
            <button onClick={() => setViewEditTask(!viewEditTask)}>
              Edit Task
            </button>
          </span>
        )}
      </div>
      {viewEditTask && (
        <div className={classes.editForm}>
          <EditTaskForm taskProp={task} />
        </div>
      )}
    </div>
  );
}

export default TaskView;
