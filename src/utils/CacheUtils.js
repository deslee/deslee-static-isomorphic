import fs from 'fs';
import path from 'path';

export async function getHash() {
  return new Promise((resolve, reject) => {
    var publicPath = path.join(__dirname, 'public');
    var dir = fs.readdirSync(publicPath);
    var mainScriptFilter = dir.filter(name => name.indexOf('main-') == 0);
    var scriptFile = mainScriptFilter.length ? mainScriptFilter[0] : null;

    var styleFilter = dir.filter(name => name.indexOf('style-') == 0);
    var styleFile = styleFilter.length ? styleFilter[0] : null;
    var result = {}
    if (scriptFile) {
      result.scriptHash = scriptFile.substring('main-'.length, scriptFile.indexOf('.cached.js'));
    }
    if (styleFile) {
      result.styleHash = styleFile.substring('style-'.length, styleFile.indexOf('.cached.css'));
    }
    resolve(result);
  })
}
