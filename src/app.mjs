'use strict';

import express from './express.mjs';

import http from 'http';
import { exec } from 'child_process';
import { GetRequest } from '@wnynya/request';

let port = 80;
for (let i = 0; i < process.argv.length; i++) {
  if (
    process.argv[i] == '-p' &&
    process.argv.length > i + 1 &&
    process.argv[i + 1]
  ) {
    port = process.argv[i + 1];
    i++;
  }
}

exec(`kill -9 $(lsof -t -i:${port})`, () => {
  console.log(`Server start on http://localhost:${port}`);
  http.createServer(express).listen(port, () => {
    GetRequest(`http://localhost:${port}`).catch(console.warn);
  });
});
