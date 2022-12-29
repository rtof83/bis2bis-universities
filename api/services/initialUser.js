const User = require('../models/User.js');

const initialUser = async () => {
  try {
    const user = await User.find();

    if (!user.length) {
      await User.create({ name: 'admin',
                          email: 'admin@admin.com',
                          password: 'admin',
                          access: 'admin' });
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = initialUser;
