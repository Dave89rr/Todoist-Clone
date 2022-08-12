import classes from './TodayPage.module.css';
import { useSelector } from 'react-redux';
import TaskView from '../../Elements/TaskView/TaskView';
import { ReactComponent as PlusSvg } from '../../Elements/SideMenu/plus.svg';
import projectClasses from '../../Elements/ProjectView/ProjectView.module.css';

function TodayPage({ viewNewTaskForm, setViewNewTaskForm }) {
  // const projects = useSelector((state) => state.projects);
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
  const now = new Date();
  console.log('now', now);
  console.log('nowYear', now.getYear());
  const nowString = now.toString().split(' ').slice(0, 3).join(' ');
  const tomorrow = new Date(
    now.getYear() + 1900,
    now.getMonth(),
    now.getDate() + 1
  );
  console.log('tomorrow', tomorrow);
  const overdueTasks = taskArr.filter((task) => now > new Date(task.due_date));

  const todayTasks = taskArr.filter((task) => {
    let taskDate = new Date(task.due_date);
    console.log('taskDate', taskDate);
    return now < taskDate && tomorrow > taskDate;
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
      </div>
      <div className={classes.projectContainer}>
        <div className={classes.titleHolder}>
          <div className={classes[`${theme('SubHeader')}`]}>
            <span>Today</span>
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
      </div>
    </div>
  );
}

export default TodayPage;
