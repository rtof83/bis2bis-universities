const Group = require('../models/Group.js');

const initialGroup = async () => {
  try {
    const group = await Group.find();

    if (!group.length) {
      const admin = { name: 'admin',
                      POST: { grant: 'all' },
                      DELETE: { grant: 'all' },
                      PUT: { grant: 'all' },
                      GET: { grant: 'all' }
                    };

      const user = { name: 'user',
                     POST: { grant: 'none' },
                     DELETE: { grant: { '/users': 'self' } },
                     PUT: { grant: { '/universities': 'all', '/users': 'self' } },
                     GET: { grant: { '/users': 'self' } },
                     };

      await Group.insertMany([ admin, user ]);

      console.log('initial group created...');
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = initialGroup;
