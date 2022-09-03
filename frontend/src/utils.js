const updateCalendarDate = () => {
  const calendar = document.getElementById('dateCalendarSvg');

  const today = new Date();

  let date = today.getDate();

  if (date < 10) date = `0${date}`;
  if (calendar) {
    calendar.innerHTML = `${date}`;
  }
};

export default updateCalendarDate;
