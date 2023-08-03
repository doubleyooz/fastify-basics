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

const upload = {
    summary: 'upload an image',
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

export default { upload };
