import { createHash, randomBytes } from 'crypto';

const upload = async (req, reply) => {
    await req.file();
    console.log('data', req.body.file);
    return reply.send({ data: { ...req.body } });
};

const remove = async () => {
    console.log('I will remove a file');
    return reply.send({ data: 'I will remove a file' });
};

export default { upload, remove };
