import { DataTypes, Model } from 'sequelize';
import db from './index';

let sequelize = db.sequelize;

export interface ILink {
    linkName?: string;
    linkUrl?: string;
    userId?: string;
}

class Link extends Model {
    static associate(models: any): void {
        Link.belongsTo(models.User, {
            foreignKey: 'userId',
        });
    }
}

Link.init(
    {
        linkName: DataTypes.STRING,
        linkUrl: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    },
    {
        sequelize,
        modelName: 'Link',
    }
);

export default Link;
