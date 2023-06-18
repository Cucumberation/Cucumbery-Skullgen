let token = '';
let uuid = '';
let username = '';
let mode = 'x8';

let textures = {};

function log(message) {
  const element = document.querySelector('#textarea-log');
  element.value += message + '\r\n';
  element.scrollTo({
    top: element.scrollHeight,
  });
}

async function generateSkinX16(part) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  switch (part) {
    case 0: {
      drawImage(ctx, textures.top, 'br', 'top');
      drawImage(ctx, textures.face, 'tr', 'face');
      drawImage(ctx, textures.right, 'tl', 'right');
      drawImage(ctx, textures.top_hat, 'br', 'top_hat');
      drawImage(ctx, textures.face_hat, 'tr', 'face_hat');
      drawImage(ctx, textures.right_hat, 'tl', 'right_hat');
      break;
    }
    case 1: {
      drawImage(ctx, textures.top, 'tr', 'top');
      drawImage(ctx, textures.back, 'tl', 'back');
      drawImage(ctx, textures.right, 'tr', 'right');
      drawImage(ctx, textures.top_hat, 'tr', 'top_hat');
      drawImage(ctx, textures.back_hat, 'tl', 'back_hat');
      drawImage(ctx, textures.right_hat, 'tr', 'right_hat');
      break;
    }
    case 2: {
      drawImage(ctx, textures.top, 'bl', 'top');
      drawImage(ctx, textures.face, 'tl', 'face');
      drawImage(ctx, textures.left, 'tr', 'left');
      drawImage(ctx, textures.top_hat, 'bl', 'top_hat');
      drawImage(ctx, textures.face_hat, 'tl', 'face_hat');
      drawImage(ctx, textures.left_hat, 'tr', 'left_hat');
      break;
    }
    case 3: {
      drawImage(ctx, textures.top, 'tl', 'top');
      drawImage(ctx, textures.back, 'tr', 'back');
      drawImage(ctx, textures.left, 'tl', 'left');
      drawImage(ctx, textures.top_hat, 'tl', 'top_hat');
      drawImage(ctx, textures.back_hat, 'tr', 'back_hat');
      drawImage(ctx, textures.left_hat, 'tl', 'left_hat');
      break;
    }
    case 4: {
      drawImage(ctx, textures.bottom, 'br', 'bottom');
      drawImage(ctx, textures.face, 'br', 'face');
      drawImage(ctx, textures.right, 'bl', 'right');
      drawImage(ctx, textures.bottom_hat, 'br', 'bottom_hat');
      drawImage(ctx, textures.face_hat, 'br', 'face_hat');
      drawImage(ctx, textures.right_hat, 'bl', 'right_hat');
      break;
    }
    case 5: {
      drawImage(ctx, textures.bottom, 'tr', 'bottom');
      drawImage(ctx, textures.back, 'bl', 'back');
      drawImage(ctx, textures.right, 'br', 'right');
      drawImage(ctx, textures.bottom_hat, 'tr', 'bottom_hat');
      drawImage(ctx, textures.back_hat, 'bl', 'back_hat');
      drawImage(ctx, textures.right_hat, 'br', 'right_hat');
      break;
    }
    case 6: {
      drawImage(ctx, textures.bottom, 'bl', 'bottom');
      drawImage(ctx, textures.face, 'bl', 'face');
      drawImage(ctx, textures.left, 'br', 'left');
      drawImage(ctx, textures.bottom_hat, 'bl', 'bottom_hat');
      drawImage(ctx, textures.face_hat, 'bl', 'face_hat');
      drawImage(ctx, textures.left_hat, 'br', 'left_hat');
      break;
    }
    case 7: {
      drawImage(ctx, textures.bottom, 'tl', 'bottom');
      drawImage(ctx, textures.back, 'br', 'back');
      drawImage(ctx, textures.left, 'bl', 'left');
      drawImage(ctx, textures.bottom_hat, 'tl', 'bottom_hat');
      drawImage(ctx, textures.back_hat, 'br', 'back_hat');
      drawImage(ctx, textures.left_hat, 'bl', 'left_hat');
      break;
    }
  }

  return canvas.toDataURL('image/png');
}

async function generateSkinX8() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  drawImage(ctx, textures.top, null, 'top');
  drawImage(ctx, textures.bottom, null, 'bottom');
  drawImage(ctx, textures.face, null, 'face');
  drawImage(ctx, textures.back, null, 'back');
  drawImage(ctx, textures.left, null, 'left');
  drawImage(ctx, textures.right, null, 'right');
  drawImage(ctx, textures.top_hat, null, 'top_hat');
  drawImage(ctx, textures.bottom_hat, null, 'bottom_hat');
  drawImage(ctx, textures.face_hat, null, 'face_hat');
  drawImage(ctx, textures.back_hat, null, 'back_hat');
  drawImage(ctx, textures.left_hat, null, 'left_hat');
  drawImage(ctx, textures.right_hat, null, 'right_hat');

  return canvas.toDataURL('image/png');
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
    case 'top_hat': {
      arr.push(8 + 32, 0, 8, 8);
      break;
    }
    case 'bottom_hat': {
      arr.push(16 + 32, 0, 8, 8);
      break;
    }
    case 'left_hat': {
      arr.push(0 + 32, 8, 8, 8);
      break;
    }
    case 'face_hat': {
      arr.push(8 + 32, 8, 8, 8);
      break;
    }
    case 'right_hat': {
      arr.push(16 + 32, 8, 8, 8);
      break;
    }
    case 'back_hat': {
      arr.push(24 + 32, 8, 8, 8);
      break;
    }
  }
  ctx.drawImage(image, ...arr);
}

async function mojangAPIGetUsername() {
  const res = await fetch('/api/mojang/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

async function mojangAPIPostSkin(file) {
  const res = await fetch('/api/mojang/skin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      token: token,
      uuid: uuid,
      file: file,
    }),
  });
  return await res.json();
}

async function setTexture(face, file, preview = true) {
  async function emptyImage(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = canvas.toDataURL('image/png');
    return new Promise((resolve) => {
      image.onload = () => {
        resolve(image);
      };
    });
  }

  let image = new Image();
  if (file == null) {
    const size = mode == 'x16' ? 16 : 8;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    image.src = canvas.toDataURL('image/png');
  } else {
    if (file.type != 'image/png') {
      return;
    }
    image.src = URL.createObjectURL(file);
  }

  await new Promise((resolve) => {
    image.onload = () => {
      resolve();
    };
  });

  if (face == 'all') {
    textures['top'] = image;
    textures['bottom'] = image;
    textures['face'] = image;
    textures['back'] = image;
    textures['left'] = image;
    textures['right'] = image;
  } else if (face == 'all_hat') {
    textures['top_hat'] = image;
    textures['bottom_hat'] = image;
    textures['face_hat'] = image;
    textures['back_hat'] = image;
    textures['left_hat'] = image;
    textures['right_hat'] = image;
  } else {
    textures[face] = image;
  }

  for (const face in textures) {
    document.querySelector(
      `#dropbox .box[face=${face}] .bg`
    ).innerHTML = `<img src="${textures[face]?.src}" />`;
  }

  if (preview) {
    previewSkin();
  }
}

async function previewSkin() {
  for (let i = 0; i < 8; i++) {
    document.querySelector(`#preview .skin.no${i}`).innerHTML = '';
  }

  if (mode == 'x16') {
    for (let i = 0; i < 8; i++) {
      const png = await generateSkinX16(i);
      const img = document.createElement('img');
      img.src = png;
      document.querySelector(`#preview .skin.no${i}`).appendChild(img);
    }
    const mini = await generateSkinX8();
    const miniimg = document.createElement('img');
    miniimg.src = mini;
    document.querySelector(`#preview .skin.mini`).innerHTML = '';
    document.querySelector(`#preview .skin.mini`).appendChild(miniimg);
  } else {
    const png = await generateSkinX8();
    const img = document.createElement('img');
    img.src = png;
    document.querySelector(`#preview .skin.x8`).innerHTML = '';
    document.querySelector(`#preview .skin.x8`).appendChild(img);
  }
}

async function uploadSkin() {
  if (!token || !username || !uuid) {
    alert('토큰이 올바르지 않거나 없습니다.');
    return;
  }

  log(`---------------- 새 작업 ----------------`);

  if (mode == 'x16') {
    let urls = [];
    for (let i = 0; i < 8; i++) {
      const png = await generateSkinX16(i);
      log(`스킨 (${i + 1} / 8) 생성됨`);
      const url = (await mojangAPIPostSkin(png)).url;
      log(`스킨 (${i + 1} / 8) 업로드됨: ${url}`);
      urls[i] = url;
    }

    const mini = await generateSkinX8();
    log(`스킨 소형화 생성됨`);
    const miniurl = (await mojangAPIPostSkin(mini)).url;
    log(`스킨 소형화 업로드됨: ${miniurl}`);

    let message = '';
    message += '디스플레이 블록 명령어:\n';
    message += `/give @p glass{displays:{type:"player_heads", value: ["${urls[0]}", "${urls[1]}", "${urls[2]}", "${urls[3]}", "${urls[4]}", "${urls[5]}", "${urls[6]}", "${urls[7]}", ]}}\n`;
    message += `/itag extratag add preserve_block_nbt\n`;

    message += '\n';
    message += '디스플레이 블록 코드:\n';
    for (let i = 0; i < 8; i++) {
      message += `urls.add("${urls[i]}");\n`;
    }

    message += '\n';
    message += '소형화 스킨 URL:\n';
    message += `${miniurl}\n`;

    document.querySelector('#textarea-output').value = message;
  } else {
    const png = await generateSkinX8(i);
    log(`스킨 생성됨`);
    const url = (await mojangAPIPostSkin(png)).url;
    log(`스킨 업로드됨: ${url}`);
  }
}

function addEventListener() {
  document.querySelector('#token').addEventListener('blur', async (event) => {
    token = document.querySelector('#token').value;
    if (token.length > 400) {
      try {
        const data = await mojangAPIGetUsername();
        uuid = data.id;
        username = data.name;
        document.querySelector('#uuid').value = uuid;
        document.querySelector('#username').value = username;
        document.querySelector('#uuid ~ label').innerHTML =
          'UUID <span class="checked">✔토큰 확인됨</span>';
        document.querySelector('#username ~ label').innerHTML =
          '유저네임 <span class="checked">✔토큰 확인됨</span>';
      } catch (e) {
        console.error(e);
        uuid = '';
        username = '';
        document.querySelector('#uuid').value = uuid;
        document.querySelector('#username').value = username;
        document.querySelector('#uuid ~ label').innerHTML = 'UUID';
        document.querySelector('#username ~ label').innerHTML = '유저네임';
      }
    }
  });

  document.querySelector('#tokenguide').addEventListener('click', (event) => {
    navigator.clipboard
      .writeText(
        "console.log(`; ${document.cookie}`.split('; bearer_token=').pop().split(';').shift());"
      )
      .then(() => {
        alert('코드가 클립보드에 복사됨');
      });
  });

  document.querySelector('#upload').addEventListener('click', (event) => {
    uploadSkin();
  });

  for (const element of document.querySelectorAll('#dropbox .box.input')) {
    element.addEventListener('click', (event) => {
      var target = event.target;
      while (!target.classList.contains('box')) {
        target = target.parentElement;
      }
      target.classList.remove('drag');
      const face = target.getAttribute('face');

      if (event.shiftKey) {
        setTexture(face, null);
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.addEventListener('change', (event) => {
          const files = input.files;
          if (files.length == 0) {
            return;
          }

          setTexture(face, files[0]);
        });
        input.click();
      }
    });
    element.addEventListener(
      'drop',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        var target = event.target;
        while (!target.classList.contains('box')) {
          target = target.parentElement;
        }
        target.classList.remove('drag');
        const face = target.getAttribute('face');
        var files = event.dataTransfer.files;
        if (files.length == 0) {
          return;
        }

        setTexture(face, files[0]);
      },
      false
    );
    element.addEventListener(
      'dragenter',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        var target = event.target;
        while (!target.classList.contains('box')) {
          target = target.parentElement;
        }
        target.classList.add('drag');
      },
      false
    );
    element.addEventListener(
      'dragleave',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        var target = event.target;
        while (!target.classList.contains('box')) {
          target = target.parentElement;
        }
        target.classList.remove('drag');
      },
      false
    );
    element.addEventListener(
      'dragover',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        var target = event.target;
        while (!target.classList.contains('box')) {
          target = target.parentElement;
        }
        target.classList.add('drag');
      },
      false
    );
  }

  for (const element of document.querySelectorAll(
    'input[name="texturesize"]'
  )) {
    element.addEventListener('change', (event) => {
      updateMode();
    });
  }

  async function updateMode() {
    mode = document.querySelector('input[name="texturesize"]:checked').value;
    if (mode == 'x16') {
      document.querySelector('#preview .wrapperx16').style.display = 'flex';
      document.querySelector('#preview .wrapperx8').style.display = 'none';
    } else {
      document.querySelector('#preview .wrapperx16').style.display = 'none';
      document.querySelector('#preview .wrapperx8').style.display = 'flex';
    }

    await setTexture('all', null, false);
    await setTexture('all_hat', null);

    await previewSkin();
  }

  updateMode();
}

addEventListener();
