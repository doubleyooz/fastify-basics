import { email, password, Authorization } from "../utils/schema.util";

const schema = (props: any) => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...props,
        },
        required: [...Object.keys(props)],
    };
};

const signIn = {
    summary:
        'Validate the provided email and password, it will return an access token if it passes the validation',
    consumes: ['application/json'],
    headers: schema({ Authorization: Authorization }),
    response: {
        200: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

const revokeToken = {
    summary:
        "Revoke user's refresh tokens, it will be succesful if it receives a valid refresh token",
    consumes: ['application/json'],
    headers: schema({ Authorization: Authorization }),
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};

export default { signIn, revokeToken };
