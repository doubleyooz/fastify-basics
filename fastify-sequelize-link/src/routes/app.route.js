const app = (fastify, options, done) => {
    fastify.get(`/`, {
        schema: {
            response: {
                200: {
                    type: 'string',
                    data: 'Hello World!',
                },
            },
        },
        handler: (req, reply) => {
            return reply.send('Hello World!');
        },
    });
    done();
};

export default app;
