import {TranslocoGlobalConfig} from '@jsverse/transloco-utils';
    
const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: [ 'uz', 'ru' ],
  defaultLang: 'uz',
  keysManager: {}
};
    
export default config;