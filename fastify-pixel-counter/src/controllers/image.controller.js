import { createHash, randomBytes } from 'crypto';
import { ensureDir, removeFile, writeFile } from '../utils/upload.util.js';

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

const remove = async (req, reply) => {
    const { filename } = req.body;
    return reply.code((await removeFile(filename)) ? 200 : 404).send();
};

export default { upload, remove };
