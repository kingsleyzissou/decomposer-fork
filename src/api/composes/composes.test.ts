import { afterAll, describe, expect, it } from 'bun:test';
import { StatusCodes } from 'http-status-codes';
import { mkdtemp, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validate } from 'uuid';

import { Status } from '@app/constants';

import { composeRequest } from '@fixtures';
import { createTestClient, createTestStore } from '@fixtures';

import type { ComposeStatus, Composes } from './types';

describe('Composes handler tests', async () => {
  const tmp = await mkdtemp(path.join(tmpdir(), 'decomposer-test'));
  const store = createTestStore(tmp);
  const client = createTestClient(store);

  afterAll(async () => {
    await rmdir(tmp, { recursive: true });
  });

  let newCompose = '';

  it('GET /composes should initially be empty', async () => {
    const res = await client.composes.$get();
    expect(res.status).toBe(StatusCodes.OK);
    const body = (await res.json()) as Composes;
    expect(body).not.toBeUndefined();
    expect(body.meta.count).toBe(0);
    expect(body.data).not.toBeUndefined();
    expect(body.data.length).toBe(0);
  });

  it('POST /compose should create a new compose', async () => {
    const res = await client.compose.$post({
      json: composeRequest,
    });
    expect(res.status).toBe(StatusCodes.OK);
    const { id } = await res.json();
    newCompose = id;
    expect(validate(id)).toBeTrue();
  });

  it('GET /composes should have one compose now', async () => {
    const res = await client.composes.$get();
    expect(res.status).toBe(StatusCodes.OK);
    const body = (await res.json()) as Composes;
    expect(body).not.toBeUndefined();
    expect(body.meta.count).toBe(1);
    expect(body.data).not.toBeUndefined();
    expect(body.data.length).toBe(1);
  });

  it('GET /composes/:id should get the compose status', async () => {
    const res = await client.composes[':id'].$get({
      param: {
        id: newCompose,
      },
    });
    expect(res.status).toBe(StatusCodes.OK);
    const body = (await res.json()) as ComposeStatus;
    expect(body).not.toBeUndefined();
    expect(body.image_status.status).toBe(Status.PENDING);
  });

  it('GET /composes/:id for non-existing compose should return 404', async () => {
    const res = await client.composes[':id'].$get({ param: { id: '123' } });
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});
