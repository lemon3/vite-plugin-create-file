# vite-plugin-create-file
adds one or multiple files to your build (outDir) directory.

## usage
```js
import { defineConfig } from 'vite';
import Writer from 'vite-plugin-create-file';

export default defineConfig({
  // ...
  plugins: [
    Writer([
      {
        // outDir: './dist',
        // content: 'test',
        filename: 'name.txt', // required
      },
    ]),
  ],
});
```
