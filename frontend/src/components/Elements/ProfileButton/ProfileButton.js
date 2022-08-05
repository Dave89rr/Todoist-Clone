import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTheme } from '../../../store/session';
import classes from './ProfileButton.module.css';

const ProfileButton = () => {
  const user = useSelector((state) => state.session.user);
  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  let letter;
  let userUpdate;
  if (user) {
    letter = user.username[0].toUpperCase();
    userUpdate = JSON.parse(JSON.stringify(user));
  }
  return (
    <div
      className={classes.profBtn}
      onClick={() => {
        // setProfileMenu(true)
        userUpdate.theme = !user.theme;
        // console.log(userUpdate.theme);
        dispatch(updateUserTheme(userUpdate));
      }}
    >
      <span className={classes.profBtnLetter}>{letter}</span>
    </div>
  );
};
export default ProfileButton;
