import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Homepage() {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  console.log(user);
  if (user) {
    history.push('/today');
  }
  return <h1>HomePage</h1>;
}
export default Homepage;
