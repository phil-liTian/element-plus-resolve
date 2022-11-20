// 数据基本类型的处理

const _toString = Object.prototype.toString;

export const typeToString = (val) => {
  return _toString.call(val);
};
