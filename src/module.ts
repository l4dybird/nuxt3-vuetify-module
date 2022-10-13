import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import { VuetifyModuleOptions } from './runtime/vuetify';

export default defineNuxtModule<VuetifyModuleOptions>({
  setup(option, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.appConfig['$vuetify'] = option;
    nuxt.options.css.push(
      'vuetify/dist/vuetify.min.css',
      '@mdi/font/css/materialdesignicons.css'
    );
    nuxt.options.build.transpile.push('vuetify');

    const viteConfig = nuxt.options.vite;
    viteConfig['define'] = {
      ...viteConfig['define'],
      'process.env.DEBUG': false,
    };

    addPlugin(resolver.resolve('./runtime/vuetify'));
  },
});
