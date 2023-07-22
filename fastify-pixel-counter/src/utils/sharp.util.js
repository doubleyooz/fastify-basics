import sharp from 'sharp';

const white = [255, 255, 255, 255];
const black = [0, 0, 0, 255];
const red = [255, 0, 0, 255];
const blue = [0, 0, 255, 255];

export const arraysIdentical = (a, b) => {
    let i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (Array.isArray(a) && Array.isArray(b)) arraysIdentical(a[i], b[i]);
        if (a[i] !== b[i]) return false;
    }
    return true;
};

export const rawFile = async file => {
    return await sharp(file).raw().toBuffer({ resolveWithObject: true });
};
