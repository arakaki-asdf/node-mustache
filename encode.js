import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";
import dt from "date-utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadFileSync(filePath) {
    const fullPath = path.join(__dirname, filePath);
    return fs.readFileSync(fullPath, 'utf8');
}

function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data, 'utf8');
}

function loadCsv(filePath) {
    const file = loadFileSync(filePath);
    return parse(file);
}

function escape(text, csvRecord) {
    for (const record of csvRecord) {
        const  key = record[0] == "+" ? "\+" : record[0];
        const value = record[1];
        const regex = new RegExp(key , "g");
        text = text.replace(regex, value);
    }
    return text;
}

function main(args) {
    // args[0], args[1]は不要
    args.shift()
    args.shift();

    const file = loadFileSync(args[0]);
    const records = loadCsv("template/@encode.csv");
    const text = escape(file, records);
    const filePath = `${new Date().toYMD()}.txt`;
    writeFile(filePath, text);
}

main(process.argv);