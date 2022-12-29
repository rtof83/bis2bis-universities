const updateHour = () => {
//   setInterval(() => console.log(process.env.UPDATE_HOUR), 1000 * 60 * 60 * process.env.UPDATE_HOUR);
  setInterval(() => console.log(new Date()), 1000 * 60);
};

module.exports = updateHour;
