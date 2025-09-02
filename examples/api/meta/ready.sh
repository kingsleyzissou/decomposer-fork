curl --unix-socket /run/decomposer-httpd.sock \
  --request GET 'http://localhost/api/image-builder-composer/v2/ready'
