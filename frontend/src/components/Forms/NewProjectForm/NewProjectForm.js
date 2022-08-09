import classes from '../Forms.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateProject } from '../../../store/projects';

function NewProjectForm({ setViewNewProjectForm }) {
  const user = useSelector((state) => state.session.user);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [colorState, setColorState] = useState('#808080');
  const [view, setView] = useState('false');

  const colorsArr = Object.values(colors);
  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
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
      errors.push('Name must be between 1 and 50 characters long.');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      const data = await dispatch(thunkCreateProject(project));
      if (data) {
        setValidationErrors(data);
      } else {
        setName('');
        setColorState('#808080');
        setView('false');
        setViewNewProjectForm(false);
      }
    }
  };

  return (
    <div className={classes.modalBgDarkGray}>
      <form
        className={classes[`${theme('FormContainer')}`]}
        onSubmit={handleSubmit}
      >
        {validationErrors.length > 0 ? (
          <div>
            {validationErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        ) : null}
        <div className={classes[`${theme('FormTitle')}`]}>
          <span>Add project</span>
        </div>
        <div className={classes[`${theme('InputContainer')}`]}>
          <div className={classes[`${theme('Input')}`]}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes[`${theme('Input')}`]}>
          <label htmlFor="color">Color</label>
          <select
            defaultValue={'#808080'}
            onChange={(e) => setColorState(e.target.value)}
          >
            {colorsArr.map((color, id) => {
              return (
                <option key={id} value={color[1]}>
                  {color[0]}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div>
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
            <span>Boards</span>
            <input
              name="viewSection"
              type="radio"
              value="true"
              checked={view === 'true'}
              onChange={(e) => setView(e.target.value)}
            />
          </label>
        </div> */}
        <div className={classes[`${theme('BtnHolder')}`]}>
          <button
            className={classes[`${theme('CancelBtn')}`]}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setViewNewProjectForm(false);
            }}
          >
            Cancel
          </button>
          <button
            className={classes[`${theme('Confirmation')}`]}
            type="submit"
            disabled={name.length < 1 ? true : false}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProjectForm;
