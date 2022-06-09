// This file contains code that we reuse between our tests.
import Fastify from 'fastify';
import { app } from '../../src/config/fastify.config';

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
    return {};
}

// Automatically build and tear down our instance
async function build() {
    await app.ready();

    return app;
}

export { config, build };
