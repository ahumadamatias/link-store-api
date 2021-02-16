import { AuthenticationController } from '../controllers/authentication.controller';
import { Router, Request, Response } from 'express';
import { createToken } from '../services/token-service';
import bcrypt from 'bcrypt';

let router = Router();
let BCRYPT_SALT_ROUNDS = 12;

router.post('/signin', (req: Request, res: Response): void => {
    AuthenticationController.getUserByEmail(req.body)
        .then(
            async (user): Promise<{ [property: string]: any }> => {
                return {
                    samePassword: await bcrypt.compare(
                        req.body.password,
                        user.password
                    ),
                    userId: user.getDataValue('id'),
                };
            }
        )
        .then((dataUser): void => {
            console.log('entre acaa', dataUser.samePassword);
            if (!dataUser.samePassword) {
                res.status(403).send({ error: 'Contraseña incorrecta' });
                return;
            }

            res.send({ token: createToken(dataUser.userId) });
        })
        .catch((error): void => {
            res.send({ error: error });
        });
});

router.post(
    '/register',
    async (req: Request, res: Response): Promise<void> => {
        let hashedPassword = await bcrypt.hash(
            req.body.password,
            BCRYPT_SALT_ROUNDS
        );

        req.body.password = hashedPassword;

        AuthenticationController.register(req.body)
            .then((user): void => {
                res.json({ token: createToken(user.getDataValue('id')) });
            })
            .catch((error): void => {
                res.json(errorType(error));
            });
    }
);

export default router;

const errorType = (error: any) => {
    if (error.name === 'SequelizeUniqueConstraintError') {
        return { error: 'ya existe el email ingresado' };
    }

    return { error: error };
};
