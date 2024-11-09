# mustache2html
- テンプレートエンジン「マスタッシュ」を自作。
- @template.htmlのマスタッシュ「{{}}」部分をjsonを読み込んで変換

## ファイル・フォルダについて
- @template.html
    - mustacheのhtml
- /json
    - データ
- /output
    - 出力先 (jsonと同名のhtmlが出力される)

## 使い方
1. nodejsをインストール
2. npm install
3. @template.htmlを書き換える。`json/`にjson作成
4. 実行 `node main.js`


## url
- nodejs プロジェクト作成
    - https://jsprimer.net/use-case/nodecli/helloworld/

