import classes from '../Forms.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateProject } from '../../../store/projects';

function EditProjectForm({ projectProp, setViewEditProject }) {
  const user = useSelector((state) => state.session.user);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(projectProp.name);
  const [colorState, setColorState] = useState(projectProp.color);
  // const [view, setView] = useState(projectProp.view);

  const colorsArr = Object.values(colors);
  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    // let viewBool;
    // if (view === 'false') {
    //   viewBool = false;
    // } else {
    //   viewBool = true;
    // }
    const project = {
      id: projectProp.id,
      ownerId: user.id,
      name,
      color: colorState,
      view: /* viewBool */ false,
    };

    if (name.length < 1 || name.length > 30) {
      errors.push('Name must be between 1 and 30 characters');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      const data = await dispatch(thunkUpdateProject(project));
      if (data) {
        setValidationErrors(data);
      } else {
        setViewEditProject(false);
      }
    }
  };
  return (
    <div className={classes.modalBgDarkGray}>
      <form
        className={classes[`${theme('FormContainer')}`]}
        onSubmit={handleSubmit}
      >
        <div className={classes[`${theme('FormTitle')}`]}>
          <span>Edit project</span>
        </div>
        {validationErrors.length > 0 ? (
          <div className={classes.errorContainer}>
            {validationErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        ) : null}
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
          <div className={classes[`${theme('Input')}`]}>
            <label htmlFor="color">Color</label>
            <select
              defaultValue={colorState}
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
          {/* <div className={classes[`${theme('Input')}`]}>
              <span className={classes[`${theme('View')}`]}>View</span>
              <div className={classes.viewChoices}>
                <label className={classes.viewChoice} htmlFor="viewList">
                  <img
                    className={classes.viewImg}
                    src="/static/icons/list.svg"
                    alt=""
                  />
                  <div>
                    <input
                      name="viewList"
                      type="radio"
                      value="false"
                      checked={view === false}
                      onChange={(e) => setView(e.target.value)}
                    />
                    <span>List</span>  
                  </div>
                </label>
                <label className={classes.viewChoice} htmlFor="viewSection">
                  <img
                    className={classes.viewImg}
                    src="/static/icons/boards.svg"
                    alt=""
                  />
                  <div>
                    <input
                      name="viewSection"
                      type="radio"
                      value="true"
                      checked={view === true}
                      onChange={(e) => setView(e.target.value)}
                    />
                    <span>Boards</span>
                  </div>
                </label>
              </div>
            </div> */}
        </div>
        <div className={classes[`${theme('BtnHolder')}`]}>
          <button
            className={classes[`${theme('CancelBtn')}`]}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setViewEditProject(false);
            }}
          >
            Cancel
          </button>
          <button
            className={classes[`${theme('Confirmation')}`]}
            type="submit"
            disabled={name.length < 1 || name.length > 30 ? true : false}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectForm;
