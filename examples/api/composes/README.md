### Compose Endpoints

- `GET /api/image-builder-composer/v2/composes` - Get collection of compose requests
- `POST /api/image-builder-composer/v2/compose` - Create a new compose request
- `GET /api/image-builder-composer/v2/composes/:id` - Get status of a specific compose request
- `DELETE /api/image-builder-composer/v2/composes/:id` - Delete a specific compose

#### Examples

```bash
curl --unix-socket /run/decomposer-httpd.sock \
  --request GET 'http://localhost/api/image-builder-composer/v2/composes'
```

```bash
curl --unix-socket /run/decomposer-httpd.sock \
  --header "Content-Type: application/json" \
  --request POST 'http://localhost/api/image-builder-composer/v2/compose' \
  --data '{
    "distribution": "centos-9",
    "client_id": "api",
    "image_requests": [
      {
        "image_type": "guest-image",
        "architecture": "x86_64",
        "upload_request": {
          "type": "aws.s3",
          "options": {}
        }
      }
    ]
  }'
```

```bash
curl --unix-socket /run/decomposer-httpd.sock \
  --request GET 'http://localhost/api/image-builder-composer/v2/composes/YOUR-COMPOSE-ID'
```

```bash
curl --unix-socket /run/decomposer-httpd.sock \
  --request DELETE 'http://localhost/api/image-builder-composer/v2/composes/YOUR-COMPOSE-ID'
```

