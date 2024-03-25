const isTrue = (value) => ["true", 1, true].includes(value);
const isFalse = (value) => ["false", -1, 0, false].includes(value);

module.exports = {
  isFalse,
  isTrue,
};
