To install dependencies on this repository, you'll need to setup .npmrc file to have access to our packages:

```bash
echo @constanta:registry=https://gitlab.autodoc.dev/api/v4/projects/1193/packages/npm/ >> .npmrc
```

install packages

`npm install`

after install the package

`npm i @constanta/vue3`

Add next script to main.(js|ts):

```bash
# main.(js|ts)

import constanta from '@constanta/vue3';

import '@constanta/vue3/dist/styles/index.scss';

app.use(constanta);
```

For use SCSS varibels and mixins in your components need add preprocessor options:

```bash
# vite.config.(js|ts);

css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@constanta/vue3/dist/styles/global.scss";'
      }
    }
  },
```
