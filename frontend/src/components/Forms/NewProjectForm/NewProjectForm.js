import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateProject } from '../../../store/projects';

function NewProjectForm() {
  const user = useSelector((state) => state.session.user);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [colorState, setColor] = useState('#808080');
  const [view, setView] = useState('false');

  const colorsArr = Object.values(colors);
  console.log(colorsArr);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      color: colorState,
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
      setColor('#808080');
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
        <select onChange={(e) => setColor(e.target.value)}>
          {colorsArr.map((color, id) => {
            return (
              <option
                key={id}
                value={color[1]}
                selected={color[1] === colorState}
              >
                {color[0]}
              </option>
            );
          })}
        </select>
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
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log('Canceled');
        }}
      >
        Cancel
      </button>
      <button type="submit">Add</button>
    </form>
  );
}

export default NewProjectForm;
