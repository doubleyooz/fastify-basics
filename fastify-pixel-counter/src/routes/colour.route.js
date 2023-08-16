import colourController from '../controllers/colour.controller.js';
import colourSchema from '../schemas/colour.schema.js';

const app = (fastify, options, done) => {
    fastify.get(`/image/:imageId/count`, {
        schema: colourSchema.findOne,
        handler: colourController.findOne,
    });

    fastify.get(`/image/:imageId/list`, {
        schema: colourSchema.list,
        handler: colourController.list,
    });

    fastify.post(`/image/:imageId/sameColumn`, {
        schema: colourSchema.sameColumn,
        handler: colourController.sameColumn,
    });

    done();
};

export default app;
