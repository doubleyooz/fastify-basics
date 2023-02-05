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
        _id: user?._id,
        tokenVersion: user?.tokenVersion,
        exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15 minutes
    });

    const refreshToken = await reply.refreshJwtSign({
        _id: user?._id,
        tokenVersion: user?.tokenVersion,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, //1 hour
    });

    req.headers.authorization = `Bearer ${token}`;

    reply.setCookie('jid', refreshToken, {
        domain: '',
        path: '/',
        httpOnly: true,
    });

    reply.code(200).send({
        message: 'Successful login.',
        accessToken: token,
    });
    return reply;
};

const revokeRefreshToken = async (req: any, reply: any) => {
    const refreshToken = req.cookies.jid;

    if (!refreshToken) return reply.code(401).send({ message: 'Unauthorized' });

    let payload: any = null;

    try {
        payload = req.accessJwtVerify(refreshToken);
    } catch (err) {
        return reply.code(401).send({ message: 'Unauthorized.' });
    }

    if (!payload) return reply.code(401).send({ message: 'Unauthorized.' });

    User.findById(payload._id)
        .then(user => {
            if (user) {
                user.tokenVersion! += 1;
                user.save()
                    .then(result => {
                        return reply.code(200).send({
                            message: 'Successful Request.',
                        });
                    })
                    .catch(err => {
                        return reply.code(500).send({
                            message: "It's not you it's us.",
                        });
                    });
            } else {
                return reply.code(401).send({
                    message: 'Unauthorized',
                });
            }
        })
        .catch(err => {
            return reply.code(401).send({
                message: 'Unauthorized',
            });
        });
};

const refreshAccessToken = async (req: any, reply: any) => {
    const refreshToken = req.cookies.jid;

    if (!refreshToken) {
        return reply.code(401).send({
            message: 'Unauthorized request.',
        });
    }

    let payload: any = null;
    console.log(refreshToken);
    try {
        payload = await req.refreshJwtVerify(refreshToken);
    } catch (err) {
        console.log(err);
        return reply.code(401).send({
            message: 'Unauthorized request.',
        });
    }
    console.log('AUTH CONTROLLER');
    console.log(payload);
    if (!payload)
        return reply.code(401).send({
            message: 'Unauthorized request.',
        });

    const doesUserExists = await User.exists({
        _id: payload._id,
        tokenVerson: payload.Version,
    });

    if (!doesUserExists)
        return reply.code(401).send({
            message: 'Unauthorized request.',
        });

    const accessToken = await reply.accessJwtSign({
        _id: payload._id,
        tokenVersion: payload.tokenVersion,
    });

    return reply.code(200).send({
        accessToken: accessToken,
        message: 'Successful request.',
    });
};

export default { refreshAccessToken, revokeRefreshToken, signIn };
