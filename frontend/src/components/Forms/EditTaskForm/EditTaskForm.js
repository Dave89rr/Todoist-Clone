import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateTask } from '../../../store/tasks';
import classes from '../NewTaskForm/NewTaskForm.module.css';
import TextArea from 'react-textarea-autosize';
import { ReactComponent as FlagSvg } from '../NewTaskForm/flag.svg';
import { ReactComponent as FilledFlagSvg } from '../NewTaskForm/filledflag.svg';
import ProjectSelector from '../../Elements/ProjectSelector';
import DateTimePicker from 'react-datetime-picker';

function EditTaskForm({ taskProp, setViewEditTask }) {
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(taskProp.name);
  const [description, setDescription] = useState(taskProp.description);
  const [projectId, setProjectId] = useState(taskProp.projectId);
  const [priority, setPriority] = useState(taskProp.priority.toString());
  const [dueDate, setDueDate] = useState(new Date(taskProp.due_date));

  const position = taskProp.position;
  const completed = taskProp.completed;

  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
  const handleProjIdChange = (e) => {
    setProjectId(e.target.dataset.value);
    localStorage.setItem('recentProjId', e.target.dataset.value);
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
      completed,
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

  const charCountStyle = () => {
    if (description.length < 1700) return classes.hiddenCounter;
    if (description.length >= 1700 && description.length < 1800)
      return classes.counterVisible;
    if (description.length >= 1800 && description.length < 1900)
      return classes.warning;
    if (description.length >= 1900 && description.length <= 2000)
      return classes.warning2;
    if (description.length > 2000) return classes.warning3;
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
          <div className={classes.errorContainer}>
            {validationErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        ) : null}
        <div className={classes[`${theme('InputContainer')}`]}>
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
          <TextArea
            minRows={2}
            maxRows={9}
            className={classes[`${theme('Textarea')}`]}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={classes.descripCharCounter}>
          <span className={`${charCountStyle()}`}>
            {description.length}/2000
          </span>
        </div>
        <div className={classes.optionContainer}>
          <div className={classes.leftOptions}>
            <div>
              <DateTimePicker
                onChange={setDueDate}
                value={dueDate}
                minDate={new Date()}
                disableClock={true}
                required
                clearIcon={null}
                calendarIcon={null}
              />
            </div>
            <div>
              <div>
                <ProjectSelector
                  recentProjId={taskProp.projectId}
                  handleProjIdChange={handleProjIdChange}
                  projectId={projectId}
                />
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
          </div>
        </div>
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
            disabled={
              name.length < 1 || name.length > 30 || description.length > 2000
                ? true
                : false
            }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
