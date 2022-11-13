class PhilError extends Error {
  constructor(m: string) {
    super(m);
    this.name = "philError";
  }
}

// 统一抛错格式
export default (scope: string, m: string) => {
  throw new PhilError(`[${scope}] ${m}`);
};

// 统一抛出警告的格式
export const warn = (scope: string, m: string) => {
  console.warn(new PhilError(`${scope} ${m}`));
};
