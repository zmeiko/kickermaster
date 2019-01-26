#!/bin/sh
set -e
node_modules/.bin/sequelize db:migrate
exec "$@"
