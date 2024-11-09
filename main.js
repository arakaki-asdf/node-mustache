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

// mustache構文{{}} 部分をjson読み込み
// https://gist.github.com/jimeh/332765
function mustache(html, json) {
    if (typeof(html) !== "string") return "";
    if (typeof(json) !== "object") return "";

    for (var key in json) {
        html = html.replace(new RegExp("{{\\s*" + key + "\\s*}}", "g"), json[key]);
    }
    return html;
};

function loadFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    return fs.readFileSync(fullPath, 'utf8');
}
function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data, 'utf8');
}

function main() {
    const data = loadFile("test.json");
    const json = JSON.parse(data);
    for (const key in json) {
        console.log(`key: ${key}, value: ${json[key]}`);
    }

    const html = loadFile("template.html");
    const newHtml = mustache(html, json);
    console.log(newHtml);

    // https://qiita.com/n0bisuke/items/dd28122d006c95c58f9c
    console.log(new Date().toYMD());
}

main();

