const fs = require('fs');
const path = require('path');

const loadLogo = (filepath, mode, asset_url) => {
  const projectRoot = path.resolve(__dirname, '../..');
  const key = filepath
    .substr(projectRoot.length)
    .match(/^\/docs\/([^/]+)\/logo\.png$/)[1];

  let content;
  try {
    content = fs.readFileSync(filepath);
    if (mode === 'production') {
      return `${asset_url}/${key}.png`;
    }
  } catch (e) {
    if (mode === 'production') {
      return `${asset_url}/dummy.png`;
    }
    const dummyPath = path.resolve(__dirname, '../graphics/dummy.png');
    content = fs.readFileSync(dummyPath);
  }
  const data = Buffer.from(content).toString('base64');
  return `data:image/png;base64,${data}`;
};

module.exports = { loadLogo };
