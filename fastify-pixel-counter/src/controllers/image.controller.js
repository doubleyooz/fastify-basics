import { createHash, randomBytes } from 'crypto';
import { ensureDir, writeFile } from '../utils/upload.util.js';

const upload = async (req, reply) => {
    ensureDir();
    await req.file();

    const { filename } = req.body.file;
    const hash =
        createHash('md5')
            .update(randomBytes(16).toString() + filename)
            .digest('hex') + new Date().getMilliseconds();

    return reply.send({
        data: writeFile(
            hash + '.' + filename.split('.')[1],
            await req.body.file.toBuffer(),
        ),
    });
};

const remove = async () => {
    console.log('I will remove a file');
    return reply.send({ data: 'I will remove a file' });
};

export default { upload, remove };
