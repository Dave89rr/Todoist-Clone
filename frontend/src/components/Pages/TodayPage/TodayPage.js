import classes from './TodayPage.module.css';
import { useSelector } from 'react-redux';
import TaskView from '../../Elements/TaskView/TaskView';
import { ReactComponent as PlusSvg } from '../../Elements/SideMenu/plus.svg';
import { ReactComponent as EmptyDaySvg } from './emptyday.svg';
import projectClasses from '../../Elements/ProjectView/ProjectView.module.css';
import btnClass from '../../Forms/AuthForm.module.css';

function TodayPage({ viewNewTaskForm, setViewNewTaskForm }) {
  const user = useSelector((state) => state.session.user);
  const tasks = useSelector((state) => state.tasks);
  let taskArr;
  if (tasks) {
    taskArr = Object.values(tasks);
  }
  const theme = (name) => {
    if (user) {
      return `${user.theme}${name}`;
    }
  };
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const now = new Date();
  const todayString =
    now.toString().split(' ').slice(1, 3).join(' ') +
    ' ‧ Today ‧ ' +
    days[now.getDay()];
  const nowString = now.toString().split(' ').slice(0, 3).join(' ');
  const tomorrow = new Date(
    now.getYear() + 1900,
    now.getMonth(),
    now.getDate() + 1
  );
  const overdueTasks = taskArr.filter(
    (task) => now > new Date(task.due_date) && !task.completed
  );

  const todayTasks = taskArr.filter((task) => {
    let taskDate = new Date(task.due_date);
    return now < taskDate && tomorrow > taskDate && !task.completed;
  });
  return (
    <div className={classes.mainContainer}>
      <div className={classes.projectContainer}>
        <div className={classes.titleHolder}>
          <span className={classes[`${theme('PageHeader')}`]}>Today </span>{' '}
          <span className={classes.todayDate}> {nowString}</span>
        </div>
        {overdueTasks.length > 0 && (
          <>
            <div className={classes[`${theme('SubHeader')}`]}>
              <span>Overdue</span>
            </div>
            {overdueTasks.map((task) => (
              <TaskView task={task} key={task.id} />
            ))}
          </>
        )}
        <div className={classes.titleHolder} style={{ marginTop: '5%' }}>
          <div className={classes[`${theme('SubHeader')}`]}>
            <span>{todayString}</span>
          </div>
          {todayTasks.map((task) => (
            <TaskView task={task} key={task.id} />
          ))}
        </div>
        <div
          className={projectClasses[`${theme('TaskContainer')}`]}
          onClick={() => setViewNewTaskForm(!viewNewTaskForm)}
        >
          <PlusSvg fill="#DD4B39" height="24px" />
          <span className={projectClasses[`${theme('TaskTitle')}`]}>
            Add task
          </span>
        </div>
        {overdueTasks.length < 1 && todayTasks.length < 1 ? (
          <div className={classes.emptyDayContainer}>
            <div className={classes.emptySvgContainer}>
              <EmptyDaySvg />
            </div>
            <span className={classes[`${theme('EmptyTitle')}`]}>
              Get a clear view of the day ahead
            </span>
            <span className={classes[`${theme('EmptyBlurb')}`]}>
              All your tasks that are due today will show up here.
            </span>
            <div className={classes.emptyBtnHolder}>
              <button
                className={btnClass.formBtn}
                onClick={() => setViewNewTaskForm(true)}
                style={{
                  marginTop: '0',
                  width: '100%',
                  height: '100%',
                  borderRadius: '3px',
                  fontWeight: 'normal',
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TodayPage;
