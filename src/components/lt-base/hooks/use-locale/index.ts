import { inject, InjectionKey } from "vue";

type Translator = (...args: any[]) => string;

export type LocaleContext = {
  t: Translator;
};

export const LocaleInjectionKey =
  "LtLocalInjection" as unknown as InjectionKey<LocaleContext>;

let localObjCache: LocaleContext;

export const useLocalInject = () => {
  return inject(
    LocaleInjectionKey,
    localObjCache || {
      t: (...args) => {
        const [path, option] = args;
        let value;
        const array = path.split(".");
        console.log("args", array);
      },
    }
  );
};
