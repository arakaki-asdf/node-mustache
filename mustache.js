// import fs from "node:fs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// https://ja.stackoverflow.com/questions/59326/typescript%E3%81%A7date-utils%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%AEimport%E3%81%8C%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84
// 日付や日時をtoFormatで簡単に変換できる用
import dt from "date-utils";

// __filenameがなんか使えなかったので、調べて定義
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * mustache{{}}部分をjsonデータで変換
 * @link https://gist.github.com/jimeh/332765
 * @param {string} html 
 * @param {string} json 
 * @returns {string} htmlデータ
 */
function mustache(html, json) {
    if (typeof(html) !== "string") return "";
    if (typeof(json) !== "object") return "";

    for (var key in json) {
        html = html.replace(new RegExp("{{\\s*" + key + "\\s*}}", "g"), json[key]);
    }
    return html;
};

/**
 * ファイル読み込み
 * @param {string} filePath 相対パス指定
 * @returns ファイルデータ
 */
function loadFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    return fs.readFileSync(fullPath, 'utf8');
}

/**
 * ファイル書き込み
 * @param {string} filePath 相対パス
 * @param {string} data 書き込みたいデータ
 */
function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data, 'utf8');
}

/**
 * ディレクトリのファイル全て取得
 * @param {string} dirPath ディレクトリパス
 * @param {string | undefined} extension 拡張子指定 (指定無しなら全て)
 * @returns {string[]} ファイルリスト
 */
function loadDirectoryFiles(dirPath, extension = undefined) {
    const fullPath = path.join(__dirname, dirPath);
    return fs.readdirSync(fullPath, { withFileTypes: true })
        .filter(x => x.isFile && (extension === undefined ? true : path.extname(x) === extension))
        // loadFileが全て相対パス指定なので相対パスに変換する
        .map(x => path.join(x.path, x.name).replace(__dirname, ""));
}

/**
 * jsonデータからテンプレートhtmlを変換
 * @param {string} jsonPath jsonパス
 * @param {string} templatePath htmlテンプレートパス
 * @param {string} outputDir 出力dir
 */
function templateToHtml(jsonPath, templatePath, outputDir)
{
    const data = loadFile(jsonPath);
    const json = JSON.parse(data);
    const html = loadFile(templatePath);

    // https://qiita.com/n0bisuke/items/dd28122d006c95c58f9c
    // 日付ファイル名作成
    // const filePath = `${new Date().toYMD()}.html`;
    const filePath = path.join(outputDir, `${path.parse(jsonPath).name}.html`);
    // htmlのmustache部分をjsonデータに書き換える
    const newHtml = mustache(html, json);
    writeFile(filePath, newHtml);
}

function main() {
    const jsonPaths = loadDirectoryFiles("json");
    for (const jsonPath of jsonPaths) {
        templateToHtml(jsonPath, path.join("template","@template.html"), "output/")
    }
}

main();