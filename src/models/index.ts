import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db: any = {};

let sequelize: any;
let processEnv: any = process.env[config.use_env_variable];
if (config.use_env_variable && processEnv !== undefined) {
    sequelize = new Sequelize(processEnv, config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.ts'
        );
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

export default db;
