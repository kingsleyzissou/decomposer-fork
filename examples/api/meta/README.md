# Meta Endpoints

- `GET /api/image-builder-composer/v2/ready` - Health check endpoint
- `GET /api/image-builder-composer/v2/openapi.json` - OpenAPI specification


## Health Check Endpoint

Example curl request:

```bash
curl --unix-socket /tmp/decomposer-httpd.sock \
  --request GET 'http://localhost/api/image-builder-composer/v2/ready'
```

Example HTTP request:

```http
GET /tmp/decomposer-httpd.sock:/api/image-builder-composer/v2/ready HTTP/1.1
User-Agent: curl/8.x
Host: unix
```

## OpenAPI Specification Endpoint

Example curl request:

```bash
curl --unix-socket /tmp/decomposer-httpd.sock \
  --request GET 'http://localhost/api/image-builder-composer/v2/openapi.json'
```

Example HTTP request:

```http
GET /tmp/decomposer-httpd.sock:/api/image-builder-composer/v2/openapi.json HTTP/1.1
User-Agent: curl/8.x
Host: unix
```
