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
  return (
    <div className={classes.mainContainer}>
      <div className={classes.projectContainer}>
        <h1 className={classes[`${theme('SectionTitle')}`]}>Overdue</h1>
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
