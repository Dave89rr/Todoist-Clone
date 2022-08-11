import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateTask } from '../../../store/tasks';
import classes from '../NewTaskForm/NewTaskForm.module.css';
import TextArea from 'react-textarea-autosize';
import { ReactComponent as FlagSvg } from '../NewTaskForm/flag.svg';
import { ReactComponent as FilledFlagSvg } from '../NewTaskForm/filledflag.svg';

function EditTaskForm({ taskProp, setViewEditTask }) {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(taskProp.name);
  const [description, setDescription] = useState(taskProp.description);
  const [position, setPosition] = useState(taskProp.position);
  const [projectId, setProjectId] = useState(taskProp.projectId);
  const [priority, setPriority] = useState(taskProp.priority);
  const [dueDate, setDueDate] = useState(
    new Date(taskProp.due_date).toISOString().split('.')[0]
  );

  const projArr = Object.values(projects);

  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
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
      setViewEditTask(false);
    }
  };

  return (
    <div
      className={classes.modalBgTransparent}
      onClick={() => setViewEditTask(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className={classes[`${theme('NewTaskFormContainer')}`]}
        onSubmit={handleSubmit}
      >
        {validationErrors.length > 0 ? (
          <div>
            {validationErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        ) : null}
        <div className={classes[`${theme('InputContainer')}`]}>
          {/* <label htmlFor="name">Name</label> */}
          <input
            autoFocus
            className={classes[`${theme('TaskInput')}`]}
            name="name"
            type="text"
            placeholder="Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes[`${theme('InputContainer')}`]}>
          {/* <label htmlFor="description">Description</label> */}
          <TextArea
            minRows={2}
            maxRows={9}
            className={classes[`${theme('Textarea')}`]}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div>
        <label htmlFor="position">Position</label>
        <input
        name="position"
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        />
      </div> */}
        <div className={classes.optionContainer}>
          <div className={classes.leftOptions}>
            <div>
              {/* <label htmlFor="due_date">Due Date</label> */}
              <input
                name="due_date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <div>
                <select
                  defaultValue={taskProp.projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  <option value="">Select a project</option>
                  {projArr.map((project, id) => {
                    return (
                      <option
                        className={classes.option}
                        key={id}
                        value={project.id}
                      >
                        {project.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div
            className={classes[`${theme('PriorityBtn')}`]}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (priority !== '4')
                setPriority((parseInt(priority) + 1).toString());
              if (priority === '4') setPriority('1');
            }}
          >
            {priority && priority !== '4' ? (
              <FilledFlagSvg
                fill={
                  priority === '1'
                    ? '#d1453b'
                    : priority === '2'
                    ? '#eb8909'
                    : priority === '3'
                    ? '#246fe0'
                    : 'white'
                }
              />
            ) : (
              <FlagSvg fill={'#666666'} />
            )}

            {/* <input
              name="priority"
              type="text"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            /> */}
          </div>
        </div>
        {/* <div>
            <label htmlFor="priority">Priority</label>
            <input
            name="priority"
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            />
          </div> */}
        <div className={classes.BtnHolder}>
          <button
            className={classes[`${theme('CancelBtn')}`]}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setViewEditTask(false);
            }}
          >
            Cancel
          </button>
          <button
            className={classes[`${theme('Confirmation')}`]}
            type="submit"
            disabled={name.length < 1 ? true : false}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
