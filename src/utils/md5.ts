import forge from 'node-forge';
// md5
const md5pw = function (value: string) {
  const md = forge.md.md5.create();
  md.update(value);
  return md.digest().toHex();
};

export default md5pw;
