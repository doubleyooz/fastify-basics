import User, { IUser } from '../models/user.model';

const store = async (req: any, reply: any) => {
    const { email, password, name }: IUser = req.body;

    if (await User.exists({ email: email }))
        return reply.code(400).send({ error: 'duplicate key' });

    return reply.code(200).send({ data: 'okay' });
};

export default { store };
