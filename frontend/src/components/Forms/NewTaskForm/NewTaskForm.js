import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateTask } from '../../../store/tasks';

function NewTaskForm({ defaultId, setViewNewTaskForm }) {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  let recentProjId = defaultId;
  if (localStorage.getItem('recentProjId') !== null) {
    recentProjId = localStorage.getItem('recentProjId');
  }

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [projectId, setProjectId] = useState(recentProjId);
  const [priority, setPriority] = useState(4);
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split('.')[0]
  );

  const projArr = Object.values(projects);

  const handleProjIdChange = (e) => {
    setProjectId(e.target.value);
    localStorage.setItem('recentProjId', e.target.value);
  };
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
      const data = await dispatch(thunkCreateTask(task));
      if (data) {
        setValidationErrors(data);
      } else {
        setName('');
        setDescription('');
        setPosition('');
        setProjectId(recentProjId);
        setPriority(2);
        setDueDate(new Date().toISOString().split('.')[0]);
        setViewNewTaskForm(false);
      }
    }
  };

  return (
    <>
      <h1>New Task</h1>
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
          <select defaultValue={recentProjId} onChange={handleProjIdChange}>
            <option value="">Select a project</option>
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
            type="datetime-local"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
        </div>
        <button>Cancel</button>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default NewTaskForm;
