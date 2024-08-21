import { ref, type App } from 'vue';

import vue3PerfectScrollbar from 'vue3-perfect-scrollbar';
import clickOutsideVue3 from 'click-outside-vue3';

import controllers from '../src/components/controllers/_index';
import blocks from '../src/components/blocks/_index';
import features from '../src/components/features/_index';
import directives from '../src/components/directives/_index';

type Components = typeof controllers | typeof blocks | typeof features;
type Directives = typeof directives;

interface ConstantaOptions {
  preffix?: string;
  icons?: Record<string, string>;
}

const config: { app?: App; options: ConstantaOptions; icons?: Record<string, string> } = {
  app: undefined,
  options: { preffix: 'Constanta' },
};

const installComponents = (components: Components): void => {
  const { app, options, icons } = config;

  if (!app) return;
  else {
    for (const name in components) {
      const componentName = `${options.preffix}${name}`;

      if (app.component(componentName)) return;
      else if (components.hasOwnProperty(name)) {
        app.component(componentName, components[name as keyof typeof components]);
      }
    }
  }
};

const installDirectives = (): void => {
  const { app, options } = config;

  if (!app) return;
  else {
    for (const name in directives) {
      const directiveName = `${options.preffix}${name}`;

      if (app.directive(directiveName)) return;
      else if (directives.hasOwnProperty(name)) {
        app.directive(directiveName, directives[name as keyof typeof directives]);
      }
    }
  }
};

const setupIconAlias = (icons?: Record<string, string>): void => {
  const { app } = config;

  if (!app) return;

  app.provide('constantaIconAlias', icons ? icons : {});
};

const plugins = {
  install(app: App, options?: ConstantaOptions) {
    config.app = app;

    if (options) config.options = { ...config.options, ...options };

    app.use(vue3PerfectScrollbar);
    app.use(clickOutsideVue3);

    app.provide('constantaModalCount', ref(0));
    app.provide('constantaTooltipCount', ref(0));

    installComponents(controllers);
    installComponents(features);
    installComponents(blocks);

    installDirectives();

    setupIconAlias(options?.icons);
  },
};

export default plugins;
