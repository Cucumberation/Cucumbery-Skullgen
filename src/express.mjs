'use strict';

/* __dirname and __filename */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

const app = express();

app.use((req, res, next) => {
  next();
  const path = req.path;
  const method = req.method;
  console.log(`[REQ] ${method} ${path}`);
});

/* Set static files (src/public) */
app.use(express.static(path.resolve(__dirname, './public')));

/* Body (JSON) parser */
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 104857600 }));

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'O, Authorization, Accept, Content-Type, Origin, X-Access-Token, X-Requested-With, Minecraft-Token'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

/* Set basedir */
app.locals.basedir = path.resolve(__dirname);

/* Set root router */
import router from './router.mjs';
app.use('/', router);

/* Set 404 */
app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

export default app;
