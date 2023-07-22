const colourArray = {
    type: 'array',
    minItems: 4,
    maxItems: 4,
    items: {
        type: 'string',
        pattern:
            '(^[2][0-4][0-9]$|^[2][5][0-5]$|^[1][0-9][0-9]$|^[0-9][0-9]$|^[0-9]$)',
    },
    description:
        'An array with four numbers from 0 to 255 representing a rgba colour. [255, 0, 0, 255]',
};

const imageId = {
    type: 'string',
    pattern: '^[A-Za-z0-9]+.(png|jpg|jpeg){1}$',
    minLength: 39,
    maxLength: 54,
    description: 'A randomly generated unique id with the file extension',
};

const imageId2 = {
    type: 'string',
    pattern: '^[A-Za-z0-9]+$',
    minLength: 35,
    maxLength: 50,
    description: 'A randomly generated unique id',
};

const body = props => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...props,
        },
        required: [...Object.keys(props)],
    };
};

const findOne = {
    summary: 'count colour',
    consumes: ['application/json'],
    body: body({ colour: colourArray, imageId: imageId }),
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
    body: body({ imageId: imageId }),
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
    body: body({
        refColour: colourArray,
        targetColour: colourArray,
        imageId: imageId,
    }),

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
    body: body({
        colours: colourArray,
        backgroundColour: colourArray,
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
