const getUserProfileExpiryTime = function () {
  const currentTime = new Date().getTime();
  return new Date(currentTime + process.env.EXPIRY_TIME * 1000);
};

module.exports = {
  getUserProfileExpiryTime,
};
