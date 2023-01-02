const app = require('../app/server');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Config = require('../models/Config');

const login = (route) => {
  app.post(route, async (req, res) => {
    try {
      const user = await User.findOne({ name: req.body.name, password: req.body.password });
      
      if (!user)
        return res.status(401).json({ error: 'user or password invalid' });

      const config = await Config.findOne({}, { _id: 0, timeOut: 1 });

      // sign token
      const token = jwt.sign({ id: user.id, access: user.access },
                               process.env.SECRET,
                             { expiresIn: config.timeOut });

      return res.json({ auth: true,
                        id: user.id,
                        name: user.name,
                        access: user.access,
                        exp: Math.floor(Date.now() / 1000) + (config.timeOut / 1000),
                        token });
    } catch (error) {
      return res.status(500).json({ error: error });
    };
  });
};

module.exports = login;
