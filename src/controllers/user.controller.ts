import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateQuery } from 'mongoose';
import User, { IUser, LooseIUser } from '../models/user.model';
import { hashPassword } from '../utils/password.util';
import { randomPic } from '../utils/picture.util';

const store = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email, password, name }: IUser = req.body as IUser;

        const newUser: IUser = new User({
            email: email,
            password: await hashPassword(password),
            name: name,
            profile: randomPic(),
        });

        const result = await newUser.save();

        return reply.code(201).send({
            data: {
                email: result.email,
                name: result.profile,
                _id: result._id,
            },
            message: 'User created!',
        });
    } catch (err: any) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return reply.code(400).send({
                message: 'Email already in use',
                err: err,
            });
        } else {
            return reply.code(400).send({
                message: 'Bad Request',
                err: err,
            });
        }
    }
};

const findOne = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email } = req.query as { email: string };

        if (!email) {
            return reply.code(400).send({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return reply.code(404).send({ message: 'User not found' });
        }

        return reply.code(200).send({ message: 'User retrieved.', data: user });
    } catch (err) {
        console.log(err);
        return reply.code(500).send({ error: err });
    }
};

const update = async (req: FastifyRequest, reply: FastifyReply) => {
    const { newToken, auth } = req;
    const metadata = newToken ? { accessToken: newToken } : {};
    const body = req.body as UpdateQuery<LooseIUser>;
    try {
        const result = await User.updateOne({ _id: auth }, body);
        if (result.matchedCount === 0) {
            reply.code(404).send({ message: 'Not found', ...metadata });
        } else {
            reply.code(200).send({ message: 'User updated', ...metadata });
        }
    } catch (err) {
        console.log(err);
        reply.code(500).send({ error: err });
    }

    return reply;
};

export default { store, findOne, update };
