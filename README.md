## 技術スタック
* JamStack(コンテンツサーバをmicrocmsで立てる)
* Next.js + TypeScript
* Netlify

## 起動

```
yarn dev
```

## linter and formatter check

```
yarn lint
yarn lint:fix
yarn format
```

## 本番環境確認
```
yarn build
yarn start
```

## env ファイルを作成

### .env.development.local.sample の sample を外す(yarn devで読み込まれる)

```
SERVICE_DOMAIN=xxxxxxxxxxx
API_KEY=xxxxxxxxxxxx
```

※サービスドメインは、例えば自分の microCMS ページの URL が https://abc.microcms.io/ であれば abc の部分になります。

### 同様に.env.productionもsample拡張子を外して作成(yarn start, yarn buildで読み込まれる)

クライアントサイドで使用するには定義する変数名のプレフィックスにNEXT_PUBLIC_をつける

`env`ファイルは以下のようにしてプロジェクト内で参照することができます。

```
process.env.API_KEY
process.env.SERVICE_DOMAIN
```

### deployはNetlify使う予定

金額詳細は、[こちら](https://www.netlify.com/pricing/)

金額のドキュメントは[こちら](https://docs.netlify.com/accounts-and-billing/billing-faq/)

* 無料でやり切るには請求が近づくとメールがくるのでbuild停止する.

### 広告つけるかどうか
* Google Adsense
  * 無料ドメインではできない

* A8.net
  * アフィリエイト広告,審査がないから始めやすそう

* Amazonアソシエイト
  * 審査があるぽい，技術ブログなら相性良さげ

* アクセストレード

* 楽天アフィリエイト

