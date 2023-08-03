import multipart from '@fastify/multipart';
import ImageController from '../controllers/image.controller.js';
import ImageSchema from '../schemas/image.schema.js';

const app = (fastify, options, done) => {
    fastify.register(multipart, {
        limits: {
            fileSize: 50 * 1024 * 1024,
            files: 1,
        },
        attachFieldsToBody: true
    });

    fastify.post(`/image`, {
        schema: ImageSchema.upload,
        handler: ImageController.upload,
    });

    done();
};

export default app;
