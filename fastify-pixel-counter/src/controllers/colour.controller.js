import { arraysIdentical, hexToRgb, rawFile } from '../utils/sharp.util.js';
import { readFile } from '../utils/upload.util.js';

const chunkSize = 3;

const findOne = async (req, reply) => {
    const fun = async (colour, imageId) => {
        colour = colour.map(p => parseInt(p));
        colour = JSON.stringify(colour);
        let matches = 0,
            i = 0;

        const file = await readFile(imageId);
        const raw = await rawFile(file);

        const imageDataLength = raw.data.length;
        while (i < imageDataLength) {
            const chunk = raw.data.slice(i, i + chunkSize);
            let element = JSON.stringify([...new Uint16Array(chunk)]);

            if (colour === element) {
                matches++;
                console.log(`${i}/${imageDataLength}`);
            }

            i += chunkSize;
        }

        return matches;
    };

    return reply.send({
        data: await fun(hexToRgb(req.query.colour), req.params.imageId),
    });
};

const list = async (req, reply) => {
    const fun = async imageId => {
        let colours = [];
        const file = await readFile(imageId);
        const raw = await rawFile(file);

        let i = 0;
        const imageDataLength = raw.data.length;
        while (i < imageDataLength) {
            const chunk = raw.data.slice(i, i + chunkSize);
            let element = JSON.stringify([...new Uint16Array(chunk)]);
            if (!colours.includes(element)) {
                colours.push(element);
                console.log(`${i}/${imageDataLength}`);
            }
            i += chunkSize;
        }

        return colours;
    };
    return reply.send({ data: await fun(req.params.imageId) });
};

const sameColumn = async (req, reply) => {
    const fun = async (colour1, colour2, imageId) => {
        colour1 = JSON.stringify(colour1);

        colour2 = JSON.stringify(colour2);
        let coloursA = [],
            coloursB = [],
            i = 0;

        const file = await readFile(imageId);
        const raw = await rawFile(file);
        const imageDataLength = raw.data.length;
        const widthValue = num => {
            return num % raw.info.height;
        };

        while (i < imageDataLength) {
            const chunk = raw.data.slice(i, i + chunkSize);
            let element = JSON.stringify([...new Uint16Array(chunk)]);

            if (colour1 === element) {
                coloursA.push(widthValue(i));
                console.log(`${i}/${imageDataLength}`);
            } else if (colour2 === element) {
                coloursB.push(widthValue(i));
                console.log(`${i}/${imageDataLength}`);
            }

            i += chunkSize;
        }
        return [coloursA, coloursB];
    };

    const temp = await fun(
        hexToRgb(req.query.colour1),
        hexToRgb(req.query.colour2),
        req.params.imageId,
    );

    const intersection = temp[0]
        .filter(x => temp[1].includes(x))
        .reduce(function (acc, curr) {
            if (!acc.includes(curr)) acc.push(curr);
            return acc;
        }, []);
    return reply.send({ data: intersection.length });
};

//doesn't work
const cleanImage = async (req, reply) => {
    const { file, colours, backgroundColour } = req.body;
    const fun = async (file, a, b) => {
        a = a.map(p => {
            return parseInt(p);
        });

        const raw = await rawFile(file);
        const chunkSize = 4;
        for (let i = 0; i < raw.data.length; i++) {
            let temp = new Uint16Array(raw.data.slice(i, i + chunkSize));
            if (!a.includes(temp))
                raw.data.slice(
                    0,
                    i,
                    ...b.concat(raw.data.slice(i, raw.data.length)),
                );
            console.log(i);
        }
    };
    const temp = await fun(file.data, colours, backgroundColour);

    return reply.send({ data: temp });
};

export default { findOne, list, sameColumn };
