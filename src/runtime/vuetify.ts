import { defineNuxtPlugin, useAppConfig } from '#imports';
import {
  createVuetify,
  Blueprint,
  DisplayBreakpoint,
  DisplayThresholds,
  IconOptions,
  LocaleAdapter,
  VuetifyOptions,
} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
declare type ThemeOptions =
  | false
  | {
      cspNonce?: string;
      defaultTheme?: string;
      variations?: false | VariationsOptions;
      themes?: Record<string, ThemeDefinition>;
    };
declare type ThemeDefinition = DeepPartial<InternalThemeDefinition>;
interface VariationsOptions {
  colors: string[];
  lighten: number;
  darken: number;
}
interface InternalThemeDefinition {
  dark: boolean;
  colors: Colors;
  variables: Record<string, string | number>;
}
interface Colors extends BaseColors, OnColors {
  [key: string]: string;
}
interface BaseColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}
interface OnColors {
  'on-background': string;
  'on-surface': string;
  'on-primary': string;
  'on-secondary': string;
  'on-success': string;
  'on-warning': string;
  'on-error': string;
  'on-info': string;
}
interface DefaultsInstance {
  [key: string]: undefined | Record<string, unknown>;
  global?: Record<string, unknown>;
}
declare type DefaultsOptions = Partial<DefaultsInstance>;
interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint;
  thresholds?: Partial<DisplayThresholds>;
}
interface RtlOptions {
  rtl?: Record<string, boolean>;
}
interface LocaleMessages {
  [key: string]: LocaleMessages | string;
}
interface LocaleOptions {
  defaultLocale?: string;
  fallbackLocale?: string;
  messages?: LocaleMessages;
}

export class VuetifyModuleOptions implements VuetifyOptions {
  public aliases?: Record<string, any>;
  public blueprint?: Blueprint;
  public components?: Record<string, any>;
  public directives?: Record<string, any>;
  public defaults?: DefaultsOptions;
  public display?: DisplayOptions;
  public theme?: ThemeOptions;
  public icons?: IconOptions;
  public locale?: (LocaleOptions & RtlOptions) | (LocaleAdapter & RtlOptions);
  public ssr?: boolean;
  constructor(args: VuetifyOptions) {
    args = args ?? {};

    this.aliases = args.aliases;
    this.blueprint = args.blueprint;
    this.components = args.components ?? components;
    this.directives = args.directives ?? directives;
    this.defaults = args.defaults;
    this.display = args.display;
    this.theme = args.theme;
    this.icons = args.icons;
    this.locale = args.locale;
    this.ssr = args.ssr;
  }
}

export default defineNuxtPlugin((nuxt) => {
  const appConfig = useAppConfig();
  const vuetify = createVuetify(
    new VuetifyModuleOptions(appConfig['$vuetify'])
  );
  nuxt.vueApp.use(vuetify);
});
