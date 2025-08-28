import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { notFound, onError } from '@app/errors';

const middleware = new Hono()
  .notFound(notFound)
  .onError(onError)
  .use(prettyJSON())
  .use(logger());

export const app = new Hono()
  .route('*', middleware)
  .get('/health', (c) => c.json({ message: 'OK', ok: true }, 200));
