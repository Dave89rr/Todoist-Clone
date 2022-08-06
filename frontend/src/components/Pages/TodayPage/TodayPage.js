import classes from './TodayPage.module.css';
import { useSelector } from 'react-redux';
import TaskView from '../../Elements/TaskView/TaskView';

function TodayPage() {
  // const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  let taskArr;
  if (tasks) {
    taskArr = Object.values(tasks);
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.projectContainer}>
        {taskArr.map((task) => {
          if (new Date() < new Date(task.due_date)) {
            return <TaskView task={task} key={task.id} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default TodayPage;
