import { characters } from '../utils/password.util';
import { postData } from '../utils/request.util';

const crack = async (req: any, reply: any) => {
    const USERNAME = process.env.USERNAME ? process.env.USERNAME : 'username';
    const URL = process.env.URL ? process.env.URL : '';

    const payload = {
        username: USERNAME,
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

    reply.code(200).send({ result: fun(3, '') });
};

export default { crack };
