import { schema } from '../utils/schema.util.js';

const imageId2 = {
    type: 'string',
    pattern: '^[A-Za-z0-9]+$',
    minLength: 34,
    maxLength: 50,
    description: 'A randomly generated unique id',
};

const fileSchema = props => {
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

const upload = {
    summary: 'uploads an image',
    consumes: ['multipart/form-data'],
    body: fileSchema({}),
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
    body: schema({ filename: imageId2 }),
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
