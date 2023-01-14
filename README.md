## 技術スタック
* JamStack(コンテンツサーバをmicrocmsで立てる)
* Next.js + TypeScript

## 起動

```
yarn dev
```

## linter check

```
yarn lint
```

## env ファイルを作成

### .env.development.local.sample の sample を外す

```
SERVICE_DOMAIN=xxxxxxxxxxx
API_KEY=xxxxxxxxxxxx
```

※サービスドメインは、例えば自分の microCMS ページの URL が https://abc.microcms.io/ であれば abc の部分になります。

`env`ファイルは以下のようにしてプロジェクト内で参照することができます。

```
process.env.API_KEY
```
