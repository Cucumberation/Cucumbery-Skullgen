'use strict';

import express from 'express';
const router = express.Router();

import FormData from 'form-data';
import { JSONGetRequest } from '@wnynya/request';
import fs from 'fs';

/* __dirname and __filename */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

router.get('/ping', (req, res) => {
  res.send('pong!');
});

router.post('/close', (req, res) => {
  process.exit(0);
});

router.get('/api/mojang/profile', (req, res) => {
  JSONGetRequest(
    'https://api.minecraftservices.com/minecraft/profile',
    req.headers['authorization']
  )
    .then((response) => {
      console.log(
        `[MOJANG] Profile check success: ${response.body.name} (${response.body.id})`
      );
      res.json(response.body);
    })
    .catch((error) => {
      console.error(
        '[MOJANG] Profile check failed: ' + error?.status ||
          error?.message ||
          error
      );
      res.status(500).send('Internal Server Error');
    });
});

router.post('/api/mojang/skin', (req, res) => {
  (async () => {
    const token = req.body.token;
    const uuid = req.body.uuid;
    let png = req.body.file;
    png = png.replace(/^data:image\/png;base64,/, '');
    const filename = Date.now() + '.png';
    fs.writeFileSync(filename, png, { encoding: 'base64' });
    await upload(token, fs.createReadStream(filename));
    console.log(`[MOJANG] Skin upload success`);
    const url = await getSkinURL(uuid);
    console.log(`[MOJANG] Skin check success: ${url}`);
    fs.unlinkSync(filename);
    return url;
  })()
    .then((url) => {
      res.json({ url: url });
    })
    .catch((error) => {
      console.error(
        '[MOJANG] Skin upload failed: ' + error?.status ||
          error?.message ||
          error
      );
      res.status(500).send('Internal Server Error');
    });
});

async function upload(token, stream) {
  const form = new FormData();

  form.append('variant', 'classic');
  form.append('file', stream);

  return new Promise((resolve, reject) => {
    form.submit(
      {
        protocol: 'https:',
        host: 'api.minecraftservices.com',
        path: '/minecraft/profile/skins',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (error, res) => {
        setTimeout(() => {
          error ? reject(error) : resolve();
        }, 2000);
      }
    );
  });
}

async function getSkinURL(uuid) {
  const res = await JSONGetRequest(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}?time=${Date.now()}`
  );
  const base64 = res.body.properties[0].value;
  const str = Buffer.from(base64, 'base64').toString('utf8');
  const json = JSON.parse(str);
  const url = json.textures.SKIN.url;
  return url.replace(
    /^http:\/\/textures\.minecraft\.net\/texture\/(.*)$/,
    '$1'
  );
}

export default router;
