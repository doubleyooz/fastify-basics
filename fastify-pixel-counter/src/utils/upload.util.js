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
export const readFile = filename => {
    if (fs.existsSync(dir + filename + '.jpg')) {
        return rf(dir + filename + '.jpg');
    } else if (fs.existsSync(dir + filename + '.png')) {
        return rf(dir + filename + '.png');
    } else return rf(dir + filename + '.jpeg');
};

export const removeFile = async filename => {
    const temp = async mimetype => {
        return new Promise((resolve, reject) => {
            fs.rm(dir + filename + mimetype, err => {
                if (err) {
                    console.error('Error removing file:', err);
                    reject(false);
                } else {
                    console.log('File removed successfully');
                    resolve(true);
                }
            });
        });
    };

    if (fs.existsSync(dir + filename + '.jpg')) {
        return temp('.jpg');
    } else if (fs.existsSync(dir + filename + '.png')) {
        return temp('.png');
    } else if (fs.existsSync(dir + filename + '.jpeg')) {
        return temp('.jpeg');
    } else return false;
};

export const writeFile = (filename, data) => {
    fs.writeFile(
        dir + filename,
        data,
        { flag: 'wx', encoding: 'binary' },
        err => {
            if (err) fs.writeFile(cutString(filename) + filename, data);
        },
    );

    return filename;
};
