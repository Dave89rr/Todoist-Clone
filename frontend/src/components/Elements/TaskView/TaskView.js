import classes from './TaskView.module.css';
import EditTaskForm from '../../Forms/EditTaskForm';
import { thunkDeleteTask } from '../../../store/tasks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TaskView({ task }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [viewEditTask, setViewEditTask] = useState(false);

  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };

  return (
    <li key={task.id}>
      <span className={`${theme('TaskTitle')}`}>{task.name}</span>
      <span>
        <button onClick={() => dispatch(thunkDeleteTask(task.id))}>
          Delete
        </button>
        <button onClick={() => setViewEditTask(!viewEditTask)}>
          Edit Task
        </button>
        {viewEditTask && <EditTaskForm taskProp={task} />}
      </span>
    </li>
  );
}

export default TaskView;
