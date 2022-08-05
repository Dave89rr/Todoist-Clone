import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ProfileButton.module.css';

const ProfileButton = () => {
  const user = useSelector((state) => state.session.user);
  const [profileMenu, setProfileMenu] = useState(false);
  let letter;
  if (user) {
    letter = user.username[0].toUpperCase();
  }
  return (
    <div className={classes.profBtn} onClick={() => setProfileMenu(true)}>
      <span className={classes.profBtnLetter}>{letter}</span>
    </div>
  );
};
export default ProfileButton;
