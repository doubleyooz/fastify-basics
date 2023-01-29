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

    const token = await reply.accessJwtSign({
        email: email,
        tokenVersion: user?.tokenVersion,
    });

    const refreshToken = await reply.refreshJwtSign({
        _id: user?._id,
        tokenVersion: user?.tokenVersion,
    });

    req.headers.authorization = `Bearer ${token}`;
    console.log(refreshToken);

    reply.setCookie('jid', refreshToken, {
        domain: '',
        path: '/',
        httpOnly: true,
    });
    console.log('here2');

    reply.code(200).send({ message: 'Successful login.', accessToken: token });
    return reply;
};

const revokeRefreshToken = async (req: any, reply: any) => {
    const refreshToken = req.cookies.jid;

    if (!refreshToken) return reply.code(401).send({ message: 'Unauthorized' });

    let payload: any = null;

    try {
        payload = req.acessJwtVerify(refreshToken);
    } catch (err) {
        return reply.status(401).send({ message: 'Unauthorized.' });
    }

    if (!payload) return reply.status(401).send({ message: 'Unauthorized.' });

    User.findById(payload._id)
        .then(user => {
            if (user) {
                user.tokenVersion! += 1;
                user.save()
                    .then(result => {
                        return reply.status(200).send({
                            message: 'Successful Request.',
                        });
                    })
                    .catch(err => {
                        return reply.status(500).send({
                            message: "It's not you it's us.",
                        });
                    });
            } else {
                return reply.status(401).send({
                    message: 'Unauthorized',
                });
            }
        })
        .catch(err => {
            return reply.status(401).send({
                message: 'Unauthorized',
            });
        });
};

export default { signIn, revokeRefreshToken };
