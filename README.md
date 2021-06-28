<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/43836584/98494083-64aa3780-227f-11eb-99eb-353d0e389f18.png">
  <h3 align="center">Twitter Box</h3>
  <p align="center">Twitter のデータをピン留めされたgist に自動更新で表示させる</p>
</p>

---

> 📌✨ inspire: https://github.com/matchai/waka-box

#### これは何?

Twitter のデータをピン留めされた gist に自動更新で表示させることができます

#### 機能

- ツイ廃あらーと(https://twihaialert.net/)
  - 昨日のツイート数(うち RT 数)を数えます

## Setup

### 必要なもの

- Github アカウント
- Twitter アカウント
  - 開発者申請をする必要がある

### 準備

1. GitHub Gist を`public` で作成します (https://gist.github.com/)
1. `gist` スコープを持つトークンを作成し、それをコピーしておきます (https://github.com/settings/tokens/new)
1. Twitter Developers ページで、任意のアカウントでログインします (https://developer.twitter.com/en/apps/)
   1. 新しい App を作成するために開発者申請をします
   1. 新しい App を作成し、Bearer Token を作成し、それをコピーしておきます
1. 利用したい Twitter Account の ID をコピーしておきます

### 始めるために

1. この repository を Fork します
1. `.github/workflows/schedule.yml` の[環境変数](https://github.com/ivgtr/twitter-box/blob/master/.github/workflows/schedule.yml#L16-L20) を編集します:
   - **GIST_ID:** あなたの gist url の ID 部分: `https://gist.github.com/ivgtr/`**`21fd0f552ed73091f0b19c4732683805`**.
   - **TWITTER_ID:** 利用する Twitter の ID
1. repository の Settings > Secrets へ行きます
1. 以下の環境変数を追加します:
   - **GH_TOKEN:** 上記で生成された GitHub トークン
   - **TWITTER_TOKEN:** 上記で生成された Twitter の Bearer Token

## License

MIT ©[ivgtr](https://github.com/ivgtr)

[![Github Follow](https://img.shields.io/github/followers/ivgtr?style=social)](https://github.com/ivgtr) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)
