require('dotenv').config();

const personalAccessToken = process.env.SPECIFY_TOKEN;

const assetsFolder = './src/assets/icons';
const variablesFolder = `./src/styles/variables`;
const typographyFolder = `./src/styles/typography`;

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
 * Variables
 */
const getColors = {
  name: '[SCSS] Colors',
  path: `${variablesFolder}/_colors.scss`,
  filter: {
    types: ['color'],
  },
  parsers: [
    parsers.sortBy,

    {
      name: 'to-scss-variables',
      options: {
        formatName: 'snakeCase',
        formatTokens: {
          color: 'hex',
        },
      },
    },
  ],
};

const getShadows = {
  name: '[SCSS] Shadows',
  path: `${variablesFolder}/_effects.scss`,
  filter: {
    types: ['shadow'],
  },
  parsers: [
    parsers.kebabcasify,
    parsers.sortBy,

    {
      name: 'to-scss-variables',
      options: {
        formatName: 'snakeCase',
      },
    },
  ],
};

/**
 * Typography
 */
const getTextStyleToMixins = {
  name: '[SCSS] Font style mixins',
  path: `${typographyFolder}/_mixins.scss`,
  filter: {
    types: ['textStyle'],
  },
  parsers: [
    parsers.kebabcasify,
    parsers.sortBy,
    parsers.replaceString.replaceFontName,

    {
      name: 'to-scss-mixin-text-style',
      options: {
        exclude: ['color', 'text-indent', 'vertical-align', 'text-align'],
        prefix: 'font-style-',
        relativeLineHeight: false,
        genericFamily: 'sans-serif',
        cssClassFormat: 'snakeCase',
      },
    },
  ],
};

const getTextStyleToClasses = {
  name: '[SCSS] Font style classes',
  path: `${typographyFolder}/_fonts.scss`,
  filter: {
    types: ['textStyle'],
  },
  parsers: [
    parsers.kebabcasify,
    parsers.sortBy,
    parsers.replaceString.replaceFontName,

    {
      name: 'to-css-text-style',
      options: {
        exclude: ['color', 'text-indent', 'vertical-align', 'text-align'],
        prefix: 'font-style-',
        relativeLineHeight: false,
        genericFamily: 'sans-serif',
        cssClassFormat: 'snakeCase',
      },
    },
  ],
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
    parsers.kebabcasify,

    {
      name: 'svgo',
      options: {
        svgo: {
          js2svg: {
            pretty: true,
          },
        },
      },
    },
  ],
};

const rules = [getColors, getShadows, getTextStyleToMixins, getTextStyleToClasses];

module.exports = {
  repository: '@autodoc/mother-test',
  personalAccessToken,
  rules,
};
