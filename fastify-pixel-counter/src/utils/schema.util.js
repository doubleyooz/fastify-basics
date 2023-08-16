export const schema = props => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...props,
        },
        required: [...Object.keys(props)],
    };
};

export const imageId = {
    type: 'string',
    pattern: '^[A-Za-z0-9]+$',
    minLength: 34,
    maxLength: 50,
    description: 'A randomly generated unique id',
}
