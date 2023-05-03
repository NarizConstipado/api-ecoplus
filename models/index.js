const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/db.config.js')
const db = {}
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, 
{
    host: config.HOST,
    dialect: 'mysql'
});


const User = sequelize.define("user",
{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: `Please provide username!`},
        }  
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: `Please provide a name!`},
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: `Please provide an email!`},
            isEmail: {msg: `Must be a valid email address!`}
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: `Please provide a password!`},
        }
    },
    genreDesc: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['M'], ['F'], ['OTHER']]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    //Fazer validação para verificar se é código postal ou não
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull:  false,
        validate: {
            notEmpty: {msg: `Please provide a location!`}
        }
    },
    birthDate: {
        allowNull:  false,
        type: DataTypes.DATE,
        validate: {
            notEmpty: {msg: `Please provide a Birth Date!`},
        },
        isDate: {msg: `Invalid Birth Date!`}
    },
    contact: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        },
        isNumeric: {msg: `Please provide a Phone Number!`}
    },
    description: {
        type: DataTypes.STRING,
        allowNull:  false,
        validate: {
            notEmpty: {msg: `Please provide a School name!`}
        },
    },
    image: {
        type: DataTypes.BLOB        
    },
    icone: {
        type: DataTypes.BLOB
    },
});

const Occurrence = sequelize.define('occurrence', 
{
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a name!`},
        },
        allowNull:  false
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`},
        },
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a location!`}
        },
        allowNull:  false
    },
    image: {
        type: DataTypes.BLOB
    },
});

const Activity = sequelize.define('activity', 
{
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a name!`},
        },
        allowNull:  false
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`}
        },
        allowNull:  false
    },
    dateHour: {
        type: DataTypes.DATE,
        validate: {
            notEmpty: {msg: `Please provide a date and an hour!`}
        },
        allowNull:  false,
        isDate: true
    },
    location: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a location!`}
        },
        allowNull:  false
    },
    image: {
        type: DataTypes.BLOB
    }
});

const Event = sequelize.define('event', 
{
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a name!`}
        },
        allowNull:  false
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`},
        },
        allowNull:  false
    },
    dateHour: {
        type: DataTypes.DATE,
        validate: {
            notEmpty: {msg: `Please provide a date and an hour!`},
        },
        allowNull:  false,
        isDate: true
    },
    location: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a location!`},
        },
        allowNull:  false
    },
    image: {
        type: DataTypes.BLOB
    },
});

const Comment = sequelize.define('comment', 
{
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`},
        },
        allowNull:  false
    }
});

const Badge = sequelize.define('badge', 
{
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a name!`},
        },
        allowNull:  false
    },
    logo: {
        type: DataTypes.BLOB
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`},
        },
        allowNull:  false
    },
    condition: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a condition!`},
        },
        allowNull:  false
    }
});

const Mission = sequelize.define('mission', 
{
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a name!`},
        },
        allowNull:  false
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`},
        },
        allowNull:  false
    },
    duration: {
        type: DataTypes.DATE,
        validate: {
            notEmpty: {msg: `Please provide a date and an hour!`},
        },
        allowNull:  false,
        isDate: true
    },
    durationStart: {
        type: DataTypes.DATE
    },
});

const Logs = sequelize.define('logs', 
{
    description: {
        type: DataTypes.STRING
    }
});

const School = sequelize.define('school', 
{
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: `Please provide a description!`},
        },
        allowNull:  false
    }
});

//1:M
Event.hasMany(Comment)
Comment.belongsTo(Event);

Activity.hasMany(Comment)
Comment.belongsTo(Activity);

User.hasMany(Comment)
Comment.belongsTo(User);

User.hasMany(Occurrence)
Occurrence.belongsTo(User);

School.hasMany(User)
User.belongsTo(School);


// //N:M
Activity.belongsToMany(User, {through: 'activityUser'})
User.belongsToMany(Activity, {through: 'activityUser'});

Event.belongsToMany(User, {through: 'eventUser'})
User.belongsToMany(Event, {through: 'eventUser'});

User.belongsToMany(Mission, {through: 'missionUser'})
Mission.belongsToMany(User, {through: 'missionUser'});

User.belongsToMany(Badge, {through: 'badgeUser'})
Badge.belongsToMany(User, {through: 'badgeUser'});

// //alias
User.hasMany(Activity)
Activity.belongsTo(User, { as: 'IdCreator' });

User.hasMany(Event)
Event.belongsTo(User, { as: 'IdCreator' }); 


(async () => {
    try {

      await sequelize.sync();
      console.log("DB is successfully synchronized");
    } catch (error) {
      console.log(error);
    }
  })();

db.sequelize = sequelize;
db.User = User
db.Occurrence = Occurrence
db.Activity = Activity
db.Event = Event
db.Comment = Comment
db.Badge = Badge
db.Mission = Mission
db.Logs = Logs
db.School = School
module.exports = db