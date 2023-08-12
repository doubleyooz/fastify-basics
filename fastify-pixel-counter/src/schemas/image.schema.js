const imageId2 = {
    type: 'string',
    pattern: '^[A-Za-z0-9]+$',
    minLength: 34,
    maxLength: 50,
    description: 'A randomly generated unique id',
};

const body = props => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            file: { isFileType: true },
            ...props,
        },
        required: ['file', ...Object.keys(props)],
    };
};

const body2 = props => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            file: { isFileType: true },
            ...props,
        },
        required: [...Object.keys(props)],
    };
};


const upload = {
    summary: 'uploads an image',
    consumes: ['multipart/form-data'],
    body: body({}),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
            },
        },
    },
};

const remove = {
    summary: 'removes an image',
    body: body2({ filename: imageId2 }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
            },
        },
    },
};
export default { upload, remove };
