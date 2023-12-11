#!/bin/sh

# Migrate database and then run Nest.js
npx prisma db push && node dist/main.js

