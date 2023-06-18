import { createCanvas, loadImage } from 'canvas';
import FormData from 'form-data';
import { JSONGetRequest } from '@wnynya/request';
import fs from 'fs';

// console.log(`; ${document.cookie}`.split('; bearer_token=').pop().split(';').shift())
const token = '';
const username = '';

async function getUUID(username) {
  const res = await JSONGetRequest(
    `https://api.mojang.com/users/profiles/minecraft/${username}`
  );
  return res.body.id;
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

async function generateSkin(textures, part) {
  const canvas = createCanvas(64, 64);
  const ctx = canvas.getContext('2d');

  switch (part) {
    case 0: {
      drawImage(ctx, textures.top, 'br', 'top');
      drawImage(ctx, textures.face, 'tr', 'face');
      drawImage(ctx, textures.right, 'tl', 'right');
      break;
    }
    case 1: {
      drawImage(ctx, textures.top, 'tr', 'top');
      drawImage(ctx, textures.back, 'tl', 'back');
      drawImage(ctx, textures.right, 'tr', 'right');
      break;
    }
    case 2: {
      drawImage(ctx, textures.top, 'bl', 'top');
      drawImage(ctx, textures.face, 'tl', 'face');
      drawImage(ctx, textures.left, 'tr', 'left');
      break;
    }
    case 3: {
      drawImage(ctx, textures.top, 'tl', 'top');
      drawImage(ctx, textures.back, 'tr', 'back');
      drawImage(ctx, textures.left, 'tl', 'left');
      break;
    }
    case 4: {
      drawImage(ctx, textures.bottom, 'br', 'bottom');
      drawImage(ctx, textures.face, 'br', 'face');
      drawImage(ctx, textures.right, 'bl', 'right');
      break;
    }
    case 5: {
      drawImage(ctx, textures.bottom, 'tr', 'bottom');
      drawImage(ctx, textures.back, 'bl', 'back');
      drawImage(ctx, textures.right, 'br', 'right');
      break;
    }
    case 6: {
      drawImage(ctx, textures.bottom, 'bl', 'bottom');
      drawImage(ctx, textures.face, 'bl', 'face');
      drawImage(ctx, textures.left, 'br', 'left');
      break;
    }
    case 7: {
      drawImage(ctx, textures.bottom, 'tl', 'bottom');
      drawImage(ctx, textures.back, 'br', 'back');
      drawImage(ctx, textures.left, 'bl', 'left');
      break;
    }
  }

  const out = fs.createWriteStream(`out_${part}.png`);
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  return new Promise((resolve) => {
    out.on('finish', () => resolve(`out_${part}.png`));
  });
}

async function upload(stream) {
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
        error ? reject(error) : resolve();
      }
    );
  });
}

function drawImage(ctx, image, part, face) {
  const arr = [];
  switch (part) {
    case 'tl': {
      arr.push(0, 0, 8, 8);
      break;
    }
    case 'tr': {
      arr.push(8, 0, 8, 8);
      break;
    }
    case 'bl': {
      arr.push(0, 8, 8, 8);
      break;
    }
    case 'br': {
      arr.push(8, 8, 8, 8);
      break;
    }
  }
  switch (face) {
    case 'top': {
      arr.push(8, 0, 8, 8);
      break;
    }
    case 'bottom': {
      arr.push(16, 0, 8, 8);
      break;
    }
    case 'left': {
      arr.push(0, 8, 8, 8);
      break;
    }
    case 'face': {
      arr.push(8, 8, 8, 8);
      break;
    }
    case 'right': {
      arr.push(16, 8, 8, 8);
      break;
    }
    case 'back': {
      arr.push(24, 8, 8, 8);
      break;
    }
  }
  ctx.drawImage(image, ...arr);
}

async function task(mode) {
  const uuid = await getUUID(username);

  console.log(`${username} 계정의 UUID: ${uuid}`);

  const textures = {};
  if (mode == 'single') {
    textures.top = await loadImage('input.png');
    textures.bottom = textures.top;
    textures.face = textures.top;
    textures.back = textures.top;
    textures.left = textures.top;
    textures.right = textures.top;
  } else if (mode == '6faces') {
    textures.top = await loadImage('top.png');
    textures.bottom = await loadImage('bottom.png');
    textures.face = await loadImage('face.png');
    textures.back = await loadImage('back.png');
    textures.left = await loadImage('left.png');
    textures.right = await loadImage('right.png');
  }

  const urls = {};
  for (let i = 0; i < 8; i++) {
    const skinfile = await generateSkin(textures, i);
    console.log(`스킨 파일 (${i + 1} / 8) 생성`);
    await upload(fs.createReadStream(skinfile));
    console.log(`스킨 파일 (${i + 1} / 8) 업로드`);
    const skin = await getSkinURL(uuid);
    console.log(`스킨 파일 (${i + 1} / 8) URL: ${skin}`);
    urls[i] = skin;
    fs.unlinkSync(skinfile);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  console.log('작업 완료');
  console.log(urls);

  console.log('');
  console.log('디스플레이 블록 명령어:');
  console.log(
    `/give @p glass{displays:{type:"player_heads", value: ["${urls[0]}", "${urls[1]}", "${urls[2]}", "${urls[3]}", "${urls[4]}", "${urls[5]}", "${urls[6]}", "${urls[7]}", ]}}`
  );
  console.log(`/itag extratag add preserve_block_nbt`);

  console.log('');
  console.log('디스플레이 블록 코드:');
  for (let i = 0; i < 8; i++) {
    console.log(`urls.add("${urls[i]}");`);
  }
}

task('6faces');
