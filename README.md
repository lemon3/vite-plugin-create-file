# vite-plugin-create-file
adds one or multiple files to your build (outDir) directory.

## usage
### create one file
```js
import { defineConfig } from 'vite';
import Writer from 'vite-plugin-create-file';

export default defineConfig({
  // ...
  plugins: [
    Writer({
      // outDir: './dist',
      // content: 'test',
      filename: 'name.txt', // required
    }),
  ],
});
```

### create multiple files
use an array with objects ...
```js
import { defineConfig } from 'vite';
import Writer from 'vite-plugin-create-file';

export default defineConfig({
  // ...
  plugins: [
    Writer([
      {
        outDir: './dist',
        // content as a callback function
        // which should return a string
        content: (config) => {
          // you can use config here (if needed)
          return 'my string 1';
        },
        filename: 'test1.txt',
      },
      {
        outDir: './dist',
        content: 'my string 2',
        filename: 'test2.txt',
      },
    ]),
  ],
});
```

## options
```js
{
  // The storage directory.
  // required: false
  // Type: String
  outDir: './dist',

  // The content of the file.
  // required: false
  // Type: String, function (which returns a string)
  content: 'test',

  // The name of the file.
  // required: true
  // Type: String
  filename: 'name.txt', // required
}
```
