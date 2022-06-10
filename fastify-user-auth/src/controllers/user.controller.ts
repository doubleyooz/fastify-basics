import { IUser } from "../models/user.model";


const store = async (req: any, reply: any) => {
    const {email, password, name} : IUser = req.body;

    return reply.code(200).send({data: 'okay'})
}

export default {store}