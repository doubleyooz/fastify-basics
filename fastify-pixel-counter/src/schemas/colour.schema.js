import { schema, imageId } from '../utils/schema.util.js';

const hexColour = {
    type: 'string',
    pattern: '^#([A-Fa-f0-9]{6})$',
    description:
        'An array with four numbers from 0 to 255 representing a rgb colour. [255, 0, 255]',
};

const findOne = {
    summary: 'count colour',
    consumes: ['application/json'],
    params: schema({ imageId: imageId }),
    query: schema({ colour: hexColour }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'number' },
            },
        },
    },
};

const list = {
    summary: 'list colours',
    consumes: ['application/json'],
    params: schema({ imageId }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'array' },
            },
        },
    },
};

const sameColumn = {
    summary: 'same Column',
    consumes: ['application/json'],
    query: schema({ colour1: hexColour, colour2: hexColour }),
    params: schema({ imageId }),

    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'number' },
            },
        },
    },
};

const cleanImage = {
    summary: 'clean Image',
    consumes: ['multipart/form-data'],
    body: schema({
        colours: hexColour,
        backgroundColour: hexColour,
        imageId: imageId,
    }),

    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'array' },
            },
        },
    },
};

export default { findOne, list, sameColumn };
