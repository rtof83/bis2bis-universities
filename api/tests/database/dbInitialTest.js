const initialUser = { name: 'admin',
                      email: 'admin@admin.com',
                      password: 'admin',
                      access: 'admin'
                    };

// =======================================================

const initialGroupAdmin = { name: 'admin',
                            POST: { grant: 'all' },
                            DELETE: { grant: 'all' },
                            PUT: { grant: 'all' },
                            GET: { grant: 'all' }
                          };

// =======================================================

const initialGroupUser = { name: 'user',
                           POST: { grant: 'none' },
                           DELETE: { grant: { '/users': 'self' } },
                           PUT: { grant: { '/universities': 'all', '/users': 'self' } },
                           GET: { grant: { '/users': 'self' } },
                         };

// =======================================================

const initialConfig = { url: 'http://universities.hipolabs.com/search?country=',
                        countries: [ 'argentina',
                                      'brazil',
                                      'chile',
                                      'colombia',
                                      'paraguay',
                                      'peru',
                                      'suriname',
                                      'uruguay' ],
                        perPage: 20,
                        timeOut: 600000
                      };

// =======================================================

const initialLog = { lastUpdate: new Date(),
                     message: 'test'
                   };

// =======================================================

const initialUniversity = { 'alpha_two_code': 'TT',
                            'web_pages': ['page1@page.com', 'page2@page.com', '000'],
                            'name': 'University',
                            'country': 'Test',
                            'domains': ['uni.br', 'uni.org', 'dddd'],
                            'state-province': 'AA'
                          };

// =======================================================

module.exports = { initialUser,
                   initialGroupAdmin,
                   initialGroupUser,
                   initialConfig,
                   initialLog,
                   initialUniversity };
