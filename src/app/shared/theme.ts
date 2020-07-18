import {
  Themeio,
  SystemOverrideStrategy,
  defaultLight,
  LocalStorageStore,
} from 'themeio';

export const Themeio$ = Themeio.create({
  strategy: SystemOverrideStrategy.default(defaultLight),
  store: new LocalStorageStore('themeio'),
});
