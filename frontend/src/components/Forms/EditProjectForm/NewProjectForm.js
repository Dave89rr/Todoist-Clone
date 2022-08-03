import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateProject } from '../../../store/projects';

function EditProjectForm({ projectProp }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(projectProp.name);
  const [color, setColor] = useState(projectProp.color);
  const [view, setView] = useState(projectProp.view);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    const project = {
      id: projectProp.id,
      ownerId: user.id,
      name,
      color,
      view,
    };

    if (name.length === 0) {
      errors.push('Name for a project cannot be left blank');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      dispatch(thunkUpdateProject(project));
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
        <span>Edit project</span>
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
        <label htmlFor="color">Color</label>
        <input
          name="color"
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="view">View</label>
        <input
          name="view"
          type="text"
          value={view}
          onChange={(e) => setView(e.target.value)}
        />
      </div>
      <button>Cancel</button>
      <button type="submit">Add</button>
    </form>
  );
}

export default EditProjectForm;
