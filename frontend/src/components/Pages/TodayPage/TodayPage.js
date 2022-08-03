import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProjects } from '../../../store/projects';

function TodayPage() {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllProjects(user.id));
    // dispatch()
  }, []);

  let projArr;
  if (projects) {
    projArr = Object.values(projects);
  }
  return (
    <div>
      {projArr.length > 0 &&
        projArr.map((project) => {
          return (
            <div>
              <span>{project.name}</span>
            </div>
          );
        })}
    </div>
  );
}

export default TodayPage;
