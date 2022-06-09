export interface Request {
    min: number;
    max: number;
    url?: string;
    username?: string;
}

const crackPassword = {
    summary: 'Crack Password via brute force',
    consumes: ['application/json'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            min: { type: 'number', minimum: 1, maximum: 15 },
            max: { type: 'number', minimum: 2, maximum: 20 },
            url: { type: 'string' },
            username: {type: 'string'}
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
