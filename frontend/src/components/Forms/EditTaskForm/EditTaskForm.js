import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateTask } from '../../../store/tasks';

function EditTaskForm({ taskProp }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(taskProp.name);
  const [description, setDescription] = useState(taskProp.description);
  const [position, setPosition] = useState(taskProp.position);
  const [projectId, setProjectId] = useState(taskProp.projectId);
  const [priority, setPriority] = useState(taskProp.priority);
  const [dueDate, setDueDate] = useState(taskProp.due_date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    const task = {
      id: taskProp.id,
      ownerId: user.id,
      name,
      description,
      position,
      projectId,
      priority,
      due_date: dueDate,
    };

    if (name.length < 1 || name.length > 30) {
      errors.push('Name for a task must be between 1 and 30 characters');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      dispatch(thunkUpdateTask(task));
      setName('');
      setDescription('');
      setPosition('');
      setProjectId('');
      setPriority(2);
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {validationErrors.length > 0 ? (
        <div>
          {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      ) : null}
      <div>
        <span>Edit task</span>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="position">Position</label>
        <input
          name="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="projectId">ProjectId</label>
        <input
          name="projectId"
          type="text"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <input
          name="priority"
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="due_date">Due Date</label>
        <input
          name="due_date"
          type="text"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button>Cancel</button>
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditTaskForm;
