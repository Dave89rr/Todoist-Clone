import classes from './NewTaskForm.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateTask } from '../../../store/tasks';
import TextArea from 'react-textarea-autosize';
import { ReactComponent as FlagSvg } from './flag.svg';
import { ReactComponent as FilledFlagSvg } from './filledflag.svg';
import { useLocation } from 'react-router-dom';
import ProjectSelector from '../../Elements/ProjectSelector';
import DateTimePicker from 'react-datetime-picker';
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

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState(1);
  const [projectId, setProjectId] = useState(recentProjId);
  const [priority, setPriority] = useState('4');
  const [dueDate, setDueDate] = useState(new Date());
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

    if (name.length < 1 || name.length > 30) {
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
        setDueDate(new Date());
        setViewNewTaskForm(false);
      }
    }
  };

  return (
    <div
      className={classes.modalBgTransparent}
      onClick={() => setViewNewTaskForm(false)}
    >
      <form
        className={classes[`${theme('NewTaskFormContainer')}`]}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        {validationErrors.length > 0 ? (
          <div>
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
        <div className={classes.optionContainer}>
          <div className={classes.leftOptions}>
            <DateTimePicker
              onChange={setDueDate}
              value={dueDate}
              minDate={new Date()}
            />
            {/* <DueDate dueDate={dueDate} setDueDate={setDueDate} /> */}
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
            disabled={name.length < 1 ? true : false}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTaskForm;
