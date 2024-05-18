import { resolve } from 'path';
import fs from 'node:fs';

const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

const getSize = (bytes, decimals = 2, base = 1024) => {
  if (!Number(bytes)) return `0 ${sizes[0]}`;
  decimals = decimals < 0 ? 0 : decimals;
  const ind = Math.floor(Math.log(bytes) / Math.log(base));
  const result = parseFloat((bytes / Math.pow(base, ind)).toFixed(decimals));

  return `${result} ${sizes[ind]}`;
};

const name = 'vite-plugin-create-file';

const errorMsg = (msg) => {
  console.error('%s: \x1b[31m%s\x1b[0m', name, msg);
};

const writeFile = async (content, filename, dir) => {
  const filePath = `${dir}/${filename}`;

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (err) {
    errorMsg(err);
  }

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      errorMsg(err);
    } else {
      console.log(
        'file \x1b[36m%s\x1b[0m %s \x1b[36m%s\x1b[0m \x1b[90m| %s\x1b[0m',
        filename,
        'was written to',
        dir,
        getSize(content.length)
      );
    }
  });
};

/**
 * the defaults
 */
const defaults = {
  content: '',
  outDir: '',
  filename: null,
};

const Writer = (options) => {
  if ('object' !== typeof options) {
    errorMsg('no valid input!\n');
  }

  if (!Array.isArray(options)) {
    options = [options];
  }

  let config;

  return {
    name,
    apply: 'build',

    // get the config
    configResolved(_config) {
      config = _config;
    },

    // closeBundle hook
    closeBundle: async () => {
      options.forEach((item) => {
        if (!item.filename) {
          errorMsg('no filename given!');
          return;
        }
        if (item.outDir) {
          item.outDir = resolve(config.root, item.outDir);
        }

        defaults.outDir = config.build.outDir;
        const setting = Object.assign({}, defaults, item);
        writeFile(setting.content, setting.filename, setting.outDir);
      });
    },
  };
};

export { Writer as default };
