import { Sequelize } from "sequelize";

export class DataBaseConfig {
    private sequelize: Sequelize;

    public constructor() {
        this.sequelize = new Sequelize('linkstore', 'root', 'm981981981a', {
            host: 'localhost',
            dialect: 'mysql'
        });
    }

    public getSequelize(): Sequelize {
        return this.sequelize;
    }
}