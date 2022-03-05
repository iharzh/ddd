import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { hash } from 'bcrypt';
import { sequelize } from '../index';

class User extends Model {
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true
})

User.beforeCreate(async (user, options) => {
  console.log('beforeCreate hook')
  if (!user.username) return;

  const existingUser = await User.findOne({where: {
    username: user.username
    }})

  if(existingUser) {
    throw new Error('Username already exists')
  }
})

User.beforeCreate(async (user, options) => {
  user.password = await hash(user.password, 10);
})

// User.sync({force: true})

export default User;
