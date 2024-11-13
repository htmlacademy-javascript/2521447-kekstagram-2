const isBeyondLimit = (startWork, endWork, startMeeting, duration) => {
  const minutesInHour = 60;

  const createTimeInMitutes = (time) => time.split(':').reduce((prev, current) => +prev * minutesInHour + (+current));

  startWork = createTimeInMitutes(startWork);
  endWork = createTimeInMitutes(endWork);
  startMeeting = createTimeInMitutes(startMeeting);

  return startMeeting >= startWork && endWork - startMeeting >= duration;
};

isBeyondLimit('08:00', '17:30', '14:00', 90); // true
