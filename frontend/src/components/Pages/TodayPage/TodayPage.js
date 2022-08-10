import classes from './TodayPage.module.css';
import { useSelector } from 'react-redux';
import TaskView from '../../Elements/TaskView/TaskView';

function TodayPage() {
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
  const today = new Date().toString().split(' ').slice(0, 3).join(' ');
  return (
    <div className={classes.mainContainer}>
      <div className={classes.projectContainer}>
        <div className={classes.titleHolder}>
          <span className={classes[`${theme('PageHeader')}`]}>Today </span>{' '}
          <span className={classes.todayDate}> {today}</span>
        </div>
        {taskArr.map((task) => {
          if (new Date() > new Date(task.due_date)) {
            return <TaskView task={task} key={task.id} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default TodayPage;
