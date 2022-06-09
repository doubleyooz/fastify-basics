import { Request } from '../schemas/cracker.schema';
import { characters } from '../utils/password.util';
import { postData } from '../utils/request.util';

const crack = async (req: any, reply: any) => {
    const { username, url, min, max, startsWith }: Request = req.body;

    const URL = process.env.URL ? process.env.URL : '';

    const payload = {
        username: username
            ? username
            : process.env.USERNAME
            ? process.env.USERNAME
            : 'username',
        password: 'sdasdad',
    };
    let i = 0,
        j = 0;

    const fun = (length: number, str: string): string => {
        console.log(`${i}: '${str}'`);
        i++;
        characters.forEach(char => {
            return length > 0 ? fun(length - 1, str + char) : str;
        });
        return str;
    };

    return reply.code(200).send({ result: fun(max, startsWith ? startsWith : '') });
};

export default { crack };
