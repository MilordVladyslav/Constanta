require('dotenv').config();

const personalAccessToken = process.env.SPECIFY_TOKEN;

const assetsFolder = './src/assets/icons';

/**
 * Common rules
 */
const parsers = {
  sortBy: {
    name: 'sort-by',
    options: {
      keys: ['name'],
    },
  },
  kebabcasify: {
    name: 'kebabcasify',
    options: {
      keys: ['name'],
    },
  },
  snakecasify: {
    name: 'snakecasify',
    options: {
      keys: ['name'],
    },
  },
  replaceString: {
    replaceFontName: {
      name: 'replace-string',
      options: {
        keys: ['value.font.name'],
        regex: '-.*',
        replaceBy: '',
        trim: true,
      },
    },
  },
};

/**
 * Assets
 */
const getIcons = {
  name: '[SVG] Icons',
  path: assetsFolder,
  filter: {
    types: ['vector'],
  },
  parsers: [
    // parsers.kebabcasify,
    // {
    //   name: 'svgo',
    //   options: {
    //     svgo: {
    //       js2svg: {
    //         pretty: true,
    //       },
    //     },
    //   },
    // },
  ],
};

const rules = [getIcons];

module.exports = {
  repository: '@autodoc/AUTODOC-icon-library',
  personalAccessToken,
  rules,
};
