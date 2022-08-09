import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTheme } from '../../../store/session';
import classes from './ProfileButton.module.css';
import { ReactComponent as PaintSvg } from './paint.svg';
import { ReactComponent as LogoutIcon } from './logouticon.svg';
import { logout } from '../../../store/session';
import { actionLogoutProjects } from '../../../store/projects';
import { actionLogoutTasks } from '../../../store/tasks';

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
  const theme = (name) => {
    if (user) {
      return `${classes[`${user.theme}${name}`]}`;
    }
  };
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(actionLogoutProjects());
    dispatch(actionLogoutTasks());
  };
  const profMenu = (
    <div className={`${theme('ProfMenuContainer')}`}>
      <div className={`${theme('ProfMenuHeader')}`}>
        <div className={classes.profBtnHeader}>
          <span className={classes.profBtnLetter}>{letter}</span>
        </div>
        <div className={`${theme('UserInfo')}`}>
          <span style={{ fontWeight: 'bold' }}>{user.username}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div
        className={`${theme('ProfMenuActions')}`}
        onClick={() => {
          userUpdate.theme = !user.theme;
          dispatch(updateUserTheme(userUpdate));
          setProfileMenu(false);
        }}
      >
        <PaintSvg fill={user.theme ? '#808080' : '#9D9D9D'} />
        <span>Theme</span>
      </div>
      <div className={`${theme('ProfMenuActions')}`} onClick={onLogout}>
        <LogoutIcon
          stroke={user.theme ? '#808080' : '#9D9D9D'}
          fill={user.theme ? '#808080' : '#9D9D9D'}
        />
        <span>Logout</span>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={classes.profBtn}
        onClick={() => {
          setProfileMenu(!profileMenu);
        }}
      >
        <span className={classes.profBtnLetter}>{letter}</span>
      </div>
      {profileMenu && profMenu}
    </>
  );
};
export default ProfileButton;
