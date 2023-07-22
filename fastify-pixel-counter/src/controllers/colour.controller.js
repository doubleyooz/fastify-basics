import { arraysIdentical, rawFile } from '../utils/sharp.util.js';
import { readFile } from '../utils/upload.util.js';

const getOcurrences = async (req, reply) => {
    const fun = async (colour, imageId) => {
        colour = colour.map(p => parseInt(p));

        let matches = 0,
            i = 0;

        const file = await readFile(imageId);
        const raw = await rawFile(file);
        const chunkSize = 4;

        while (i < raw.data.length) {
            const chunk = raw.data.slice(i, i + chunkSize);

            if (arraysIdentical(colour, new Uint16Array(chunk))) {
                matches++;
                console.log(i <= 2816 ? 2816 - 2816 - i : i % 2816);
            }
            i += chunkSize;
        }

        return matches;
    };

    return reply.send({
        data: await fun(req.body.colour, req.body.imageId),
    });
};

const list = async (req, reply) => {
    const fun = async imageId => {
        let colours = [];
        const file = await readFile(imageId);
        const raw = await rawFile(file);

        const chunkSize = 4;
        let i = 0;

        while (i < raw.data.length) {
            const chunk = raw.data.slice(i, i + chunkSize);
            let temp = new Uint16Array(chunk);

            if (!colours.find(colour => arraysIdentical(colour, temp)))
                colours.push([...temp]);

            i += chunkSize;
        }

        return colours;
    };
    return reply.send({ data: await fun(req.body.imageId) });
};

const sameColumn = async (req, reply) => {
    const { imageId, targetColour, refColour } = req.body;
    const fun = async (file, a, b) => {
        a = a.map(p => {
            return parseInt(p);
        });
        b = b.map(p => {
            return parseInt(p);
        });

        let coloursA = [],
            coloursB = [],
            i = 0;

        const raw = await rawFile(file);

        const chunkSize = 4;

        while (i < raw.data.length) {
            let temp = new Uint16Array(raw.data.slice(i, i + chunkSize));
            if (arraysIdentical(a, temp))
                coloursA.push(
                    i <= raw.info.width * 4
                        ? raw.info.width * 4 - raw.info.width * 4 - i
                        : (i % raw.info.width) * 4,
                );
            else if (arraysIdentical(b, temp))
                coloursB.push(
                    i <= raw.info.width * 4
                        ? raw.info.width * 4 - raw.info.width * 4 - i
                        : (i % raw.info.width) * 4,
                );

            i += chunkSize;
        }

        return [coloursA, coloursB];
    };
    const temp = await fun(await readFile(imageId), refColour, targetColour);

    const intersection = temp[0].filter(x => temp[1].includes(x));
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

export default { getOcurrences, list, sameColumn };
