import User from 'models/user';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const createToken = (userId: any) => {
    let payload = {
        sub: userId,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    };

    return jwt.sign(payload, config.TOKEN_SECRET);
};
