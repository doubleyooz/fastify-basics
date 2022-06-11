import User, { IUser } from '../models/user.model';
import { hashPassword } from '../utils/password.util';

const store = async (req: any, reply: any) => {
    const { email, password, name }: IUser = req.body;

    const newUser: IUser = new User({
        email: email,
        password: await hashPassword(password),
        name: name,
    });

    newUser
        .save()
        .then(result => {
            reply.code(201).send({
                data: { email: result.email, _id: result._id },
                message: 'User created!',
            });
        })
        .catch(err => {
            if (err.name === 'MongoServerError' && err.code === 11000) {
                //There was a duplicate key error
                reply.code(400).send({
                    message: 'Email already in use',
                    err: err,
                });
            }
            reply.code(400).send({
                message: 'Bad Request',
                err: err,
            });
        });
    return reply;
};

const findOne = async (req: any, reply: any) => {
    const { email }: { email: string } = req.query;

    User.findOne({ email })
        .then(result => {
            if (!result) reply.code(404).send({ message: 'Not found' });

            reply.code(200).send({ message: 'User retrieved.', data: result });
        })
        .catch(err => {
            console.log(err);
            reply.code(500).send({ error: err });
        });
    return reply;
};

export default { store, findOne };
