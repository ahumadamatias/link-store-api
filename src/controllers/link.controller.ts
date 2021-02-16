import { Op } from 'sequelize';
import Link, { ILink } from '../models/link';

export class LinkController {
    public static getLinks(): Promise<any> {
        return Link.findAll();
    }

    public static getLinksByUser(userId: string): Promise<any> {
        return Link.findAll({
            where: { userId: userId },
        });
    }

    public static getLink(linkId: string, userId: string): Promise<any> {
        return Link.findOne({
            where: {
                [Op.and]: {
                    id: linkId,
                    userId: userId,
                },
            },
        });
    }

    public static createLink(link: ILink): Promise<Link> {
        return Link.create(link);
    }
}
