import User, { IUser } from '../models/user.model';
import { matchPassword } from '../utils/password.util';

const signIn = async (req: any, reply: any) => {
    const [hashType, hash] = req.headers.authorization.split(' ');

    if (hashType !== 'Basic') {
        return reply.code(401).send({ message: 'Unauthorized Request' });
    }

    const [email, supposedPassword] = Buffer.from(hash, 'base64')
        .toString()
        .split(':');

    const user = await User.findOne({ email: email }).select([
        'password',
        'tokenVersion',
    ]);

    const match = user ? matchPassword(user.password, supposedPassword) : false;

    if (!match) {
        reply.code(401).send({
            message: 'Unauthorized request.',
        });
    }

    const token = await reply.jwtSign({
        email: email,
        tokenVersion: user?.tokenVersion,
    });
    reply.code(200).send({ message: 'Successful login.', accessToken: token });
    return reply;
};

export default { signIn };
