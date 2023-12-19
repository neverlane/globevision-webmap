import Fastify from 'fastify';

import './socket';
import { PORT } from './envs';
import { serversList } from './list';
import { serverCache } from './cache';

const app = Fastify({
  logger: true,
});

const main = async () => {
  await app.addHook('onRequest', (request, reply, done) => {
    reply.raw.setHeader('access-control-allow-origin', request.headers.origin ?? '*');
    done();
  });

  app.get('/servers/:index', {
    schema: {
      params: {
        type: 'object',
        properties: {
          index: {
            type: 'number'
          }
        }
      },
      querystring: {
        type: 'object',
        properties: {
          timeout: {
            type: 'number'
          }
        }
      }
    }
  }, async (req, reply) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const serverIndex = <number> req.params.index;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeout = Math.min(Math.max(req.query.timeout ?? 0, 300), 10000);
    const write = (type: string, data: unknown) =>
      reply.raw.write(
        `event: ${type}\n` +
        `data: ${JSON.stringify(data)}\n\n`
      );
    
    reply.raw.setHeader('content-type', 'text/event-stream');
    reply.raw.setHeader('cache-control', 'no-cache');

    const sendUpdate = () => write('update', serverCache.get(serverIndex) ?? []);
    const timer = setInterval(sendUpdate, timeout);
    
    const onClose = () => {
      clearInterval(timer);
      req.socket.removeListener('close', onClose);
    };
    req.socket.addListener('close', onClose);
  
    write('notice', {message: 'connected!'});
    sendUpdate();
  });
  
  app.get('/servers', async (req, reply) => {
    reply.send({
      ok: true,
      result: serversList
    });
  });
  
  app.setErrorHandler((error, request, reply) => {
    reply.status(error.statusCode ?? 500).send({
      ok: false,
      error: {
        code: error.code,
        message: error.message
      }
    });
  });
  
  app.listen({
    port: PORT
  });
};

main();