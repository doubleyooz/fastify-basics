import {
    FastifyInstance,
    FastifyPluginCallback,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';

const app: FastifyPluginCallback = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: () => void,
) => {
    fastify.get(`/`, {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', pattern: '^Hello World!$' },
                    },
                },
            },
        },
        handler: (req: FastifyRequest, reply: FastifyReply) => {
            return reply.send('Hello dWorld');
        },
    });
    done();
};

export default app;
