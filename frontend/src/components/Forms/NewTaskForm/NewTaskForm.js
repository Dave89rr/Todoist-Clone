import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateTask } from '../../../store/tasks';

function NewTaskForm() {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [projectId, setProjectId] = useState('');
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState(new Date());

  const projArr = Object.values(projects);
  let defaultId;
  if (projArr.length > 0) {
    defaultId = projArr[0].id;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    const task = {
      ownerId: user.id,
      name,
      description,
      position,
      projectId,
      priority,
      due_date: dueDate,
    };

    if (name.length === 0) {
      errors.push('Name must be between 1 and 30 characters long.');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      const data = dispatch(thunkCreateTask(task));
      if (data) {
        setValidationErrors(data);
      } else {
        setName('');
        setDescription('');
        setPosition('');
        setProjectId(defaultId);
        setPriority(2);
        setDueDate(new Date());
      }
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
        <span>Add task</span>
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
        <label htmlFor="projectId">Project</label>
        <select
          defaultValue={defaultId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          {projArr.map((project, id) => {
            return (
              <option key={id} value={project.id}>
                {project.name}
              </option>
            );
          })}
        </select>
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
      <button type="submit">Add</button>
    </form>
  );
}

export default NewTaskForm;
