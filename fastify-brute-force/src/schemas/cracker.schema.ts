const crackPassword = {
    summary: 'Crack Password via brute force',
    consumes: ['application/json'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            min: { type: 'number' },
            max: { type: 'number' },
            url: { type: 'string' },
        },
        required: ['min', 'max'],
    },

    response: {
        200: {
            type: 'object',
            properties: {
                password: { type: 'string' },
            },
        },      
    },
};

export default { crackPassword };
