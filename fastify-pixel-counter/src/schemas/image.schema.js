import { schema, imageId } from '../utils/schema.util.js';



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
    body: schema({ filename: imageId }),
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
