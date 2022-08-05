import EditTaskForm from '../../Forms/EditTaskForm';
import { thunkDeleteTask } from '../../../store/tasks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function TaskView({ task }) {
  const dispatch = useDispatch();
  const [viewEditTask, setViewEditTask] = useState(false);

  return (
    <li key={task.id}>
      {task.name}
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
