import fs from 'fs';
import { readFile as rf } from 'fs/promises';

const dir = './uploads/';

const cutString = str => {
    return str.slice(
        str.length - (Math.floor(Math.random() * 10) + 5),
        str.length - Math.floor(Math.random() * 5),
    );
};

export const ensureDir = () => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
};
export const readFile = filename => rf(dir + filename);

export const writeFile = (filename, data) => {
    fs.writeFile(
        dir + filename,
        data,
        { flag: 'wx', encoding: 'binary' },
        err => {
            if (err) writeFile(cutString(filename) + filename, data);
        },
    );

    return filename;
};
