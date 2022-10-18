import { setup, createPage } from '@nuxt/test-utils';
import { fileURLToPath } from 'node:url';

describe('works with module option setting', async () => {
  await setup({
    browser: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    server: true,
    nuxtConfig: {
      ssr: false,
      buildModules: ['@l4dybird/nuxt3-vuetify-module'],
      hooks: {
        'vite:extendConfig'(config, { isClient }) {
          config.define!.__BROWSER__ = isClient;
        },
      },
      vite: {
        define: {
          __DEV__: false,
          __TEST__: true,
          __FEATURE_PROD_DEVTOOLS__: false,
        },
      },
    },
  });

  it('render', async () => {
    const page = await createPage('/');
    const body = await page.innerHTML('body');
    expect(body).toContain('Render Vuetify');
  });
});
