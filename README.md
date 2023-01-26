## 技術スタック
* JamStack(コンテンツサーバをmicrocmsで立てる)
* Next.js + TypeScript
* Netlify

## deployURL
環境変数をちゃんとnetlify側でも設定する(なぜか1回目は失敗した，変更せずに2回目デプロイで成功)
https://wa-ml.netlify.app/

siteを消す場合以下リンクで消す
https://app.netlify.com/sites/wa-ml/settings/general

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

### .env.sample の sample を外す(yarn devで読み込まれる)

```
SERVICE_DOMAIN=xxxxxxxxxxx
API_KEY=xxxxxxxxxxxx
```

* .env.local, .env.production, .env.development, .env.development.local, .env.production.localを適宜必要なら作成する．

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

