import User, { IUser } from '../models/user';

export class AuthenticationController {
    public static register(user: IUser): Promise<User> {
        return User.create(user);
    }

    public static getUserByEmail(user: IUser): Promise<any> {
        return User.findOne({
            where: { email: user.email },
        });
    }
}
