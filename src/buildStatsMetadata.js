import fs from 'fs'
import {replaceAll} from './utils/StringUtils'

export var metadata = JSON.parse(fs.readFileSync('./build/stats.json', 'utf8'));

export var replaceHtml = html => replaceAll(replaceAll(html, '&lt;?= scripthash ?&gt;', metadata.hash), '&lt;?= stylehash ?&gt;', metadata.hash);
