import { config } from '../config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const ensureAuthenticated = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            error: 'Tu petición no tiene cabecera de autorización',
        });
        return;
    }

    let token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.TOKEN_SECRET, (error: any, decode: any) => {
        if (error) {
            return res.status(403).json({ error: 'Token inválida' });
        }

        if (decode.exp <= moment().unix()) {
            return res.status(401).json({ error: 'El token ha expirado' });
        }

        req['userId'] = decode.sub;
        next();
    });
};
