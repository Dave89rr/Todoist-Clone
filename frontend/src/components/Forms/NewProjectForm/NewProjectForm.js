import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateProject } from '../../../store/projects';

function NewProjectForm() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('Charcoal');
  const [view, setView] = useState('false');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    let viewBool;
    if (view === 'false') {
      viewBool = false;
    } else {
      viewBool = true;
    }
    let project;
    project = {
      ownerId: user.id,
      name,
      color,
      view: viewBool,
    };

    if (name.length === 0) {
      errors.push('Name for a project cannot be left blank');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      dispatch(thunkCreateProject(project));
      setName('');
      setColor('Charcoal');
      setView('false');
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
        <span>Add project</span>
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
        <label htmlFor="viewList">
          <span>List</span>
          <input
            name="viewList"
            type="radio"
            value="false"
            checked={view === 'false'}
            onChange={(e) => setView(e.target.value)}
          />
        </label>
        <label htmlFor="viewSection">
          <span>Section</span>
          <input
            name="viewSection"
            type="radio"
            value="true"
            checked={view === 'true'}
            onChange={(e) => setView(e.target.value)}
          />
        </label>
      </div>
      <button>Cancel</button>
      <button type="submit">Add</button>
    </form>
  );
}

export default NewProjectForm;
