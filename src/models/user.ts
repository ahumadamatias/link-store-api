import db from '../models';
import { Model, DataTypes } from 'sequelize';

let sequelize = db.sequelize;

export interface IUser {
    fullName: string;
    email: string;
    password: string;
}

class User extends Model {
    public static associate(models: any) {
        User.hasMany(models.Link);
    }
}

User.init(
    {
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
