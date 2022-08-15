import classes from './Checkbox.module.css';
import { ReactComponent as CheckSvg } from './check.svg';

const Checkbox = ({ completed, handleDone, priority, theme }) => {
  console.log('theme', theme);
  console.log('priority', priority);
  let color;

  switch (true) {
    case theme === true && priority === 1: {
      color = '#FF7066'; // darkRed
      break;
    }
    case theme === true && priority === 2: {
      color = '#FB9814'; // darkOrange
      break;
    }
    case theme === true && priority === 3: {
      color = '#5195FB'; // darkBlue
      break;
    }
    case theme === true && priority === 4: {
      color = '#828282'; // darkGray
      break;
    }
    case theme === false && priority === 1: {
      color = '#D1453B'; // lightRed
      console.log('I was here');
      break;
    }
    case theme === false && priority === 2: {
      color = '#EB8909'; // lightOrange
      break;
    }
    case theme === false && priority === 3: {
      color = '#246FE0'; // lightBlue
      break;
    }
    case theme === false && priority === 4: {
      color = '#828282'; // lightGray
      break;
    }
    default:
      color = 'green';
      break;
  }

  return (
    <div
      className={classes.circle}
      style={{ borderColor: `${color}` }}
      onClick={() => handleDone()}
    >
      {completed ? (
        <div
          className={classes.checkedCircle}
          style={{
            backgroundColor: `${color}`,
            boxShadow: `0px 0px 0px 1px ${color}`,
          }}
        >
          <CheckSvg className={classes.checkSvg} fill="white" />
        </div>
      ) : (
        <div
          className={classes.circleBg}
          style={{ backgroundColor: `${color}1A` }}
        >
          <CheckSvg className={classes.toCheckSvg} fill={`${color}`} />
        </div>
      )}
    </div>
  );
};
export default Checkbox;
