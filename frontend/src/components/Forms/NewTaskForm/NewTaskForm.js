import classes from './NewTaskForm.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateTask } from '../../../store/tasks';
import TextArea from 'react-textarea-autosize';
import { ReactComponent as FlagSvg } from './flag.svg';
import { ReactComponent as FilledFlagSvg } from './filledflag.svg';
import { useLocation } from 'react-router-dom';
import ProjectSelector from '../../Elements/ProjectSelector';
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from '../../../3rd-party/react-date-time-picker/';
// import DueDate from '../../Elements/DueDate';

function NewTaskForm({ defaultId, setViewNewTaskForm }) {
  const user = useSelector((state) => state.session.user);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  let recentProjId = defaultId;
  const location = useLocation();

  if (location.pathname.split('/')[1] === 'projects') {
    recentProjId = location.pathname.split('/')[2];
  }
  const now = new Date();
  const future = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + 3,
    now.getMinutes()
  );
  const minDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes()
  );
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState(1);
  const [projectId, setProjectId] = useState(recentProjId);
  const [priority, setPriority] = useState('4');
  const [dueDate, setDueDate] = useState(future);
  const taskArr = Object.values(tasks);

  const handleProjIdChange = (e) => {
    setProjectId(e.target.dataset.value);
    localStorage.setItem('recentProjId', e.target.dataset.value);
  };
  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    let newPosition =
      taskArr.filter((task) => {
        return task.projectId === parseInt(recentProjId, 10);
      }).length + 1;
    setPosition(newPosition);

    const task = {
      ownerId: user.id,
      name,
      description,
      position,
      projectId,
      priority,
      due_date: dueDate,
      completed: false,
    };

    if (name.length < 1 || name.length > 500) {
      errors.push('Name must be between 1 and 500 characters long.');
    }
    if (!dueDate) {
      errors.push('Due date cannot be blank');
    } else if (minDate > dueDate) {
      errors.push('Due date must be set in the future');
    }
    if (description.length > 2000) {
      errors.push('Description must be at most 2000 characters long');
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
        setPriority('4');
        setDueDate(new Date());
        setViewNewTaskForm(false);
      }
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
      onMouseDown={() => setViewNewTaskForm(false)}
    >
      <form
        className={classes[`${theme('NewTaskFormContainer')}`]}
        onSubmit={handleSubmit}
        onMouseDown={(e) => e.stopPropagation()}
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
            <DateTimePicker
              onChange={setDueDate}
              value={dueDate}
              minDate={minDate}
              disableClock={true}
              clearIcon={null}
              calendarIcon={null}
              theme={user.theme}
            />
            <ProjectSelector
              recentProjId={recentProjId}
              handleProjIdChange={handleProjIdChange}
              projectId={projectId}
            />
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
              setViewNewTaskForm(false);
            }}
          >
            Cancel
          </button>
          <button
            className={classes[`${theme('Confirmation')}`]}
            type="submit"
            disabled={
              name.length < 1 || name.length > 500 || description.length > 2000
                ? true
                : false
            }
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTaskForm;
