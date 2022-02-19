// id - uuid
// first_name
// last_name
// username
// email
// created_at
// updated_a t

import { sequelize } from '../index';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

class User extends Model {
  declare id: string;
}

User.init({
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4  },
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
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true
})

export default User;
