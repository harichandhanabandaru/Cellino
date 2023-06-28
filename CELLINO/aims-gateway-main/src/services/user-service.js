const {request} = require('undici');

const getUserPermissionsByEmail = async function (email) {
  const {statusCode, body} = await request(
    process.env.USERS_TARGET + '/v1/users?email=' + email
  );
  if (statusCode === 200) {
    const users = await body.json();
    if (users.length === 1) {
      return users[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const isUserProfileExpired = function (userProfile) {
  return userProfile.expiry.getTime() > new Date().getTime();
};

module.exports = {
  getUserPermissionsByEmail,
  isUserProfileExpired,
};
