<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/43836584/98494083-64aa3780-227f-11eb-99eb-353d0e389f18.png">
  <h2 align="center">twitter-box</h2>
</p>

---

[![Twitter Follow](https://img.shields.io/twitter/follow/mawaru_hana?style=social)](https://twitter.com/mawaru_hana) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)  

#### これは何?
Twitterのデータをピン留めされたgistに自動更新で表示させることができます 

#### 機能
- ツイ廃あらーと(https://twihaialert.net/)

## Setup
### ※注意
_導入はかなり面倒くさいです_

### 準備
1. GitHub Gist を`public` で作成します (https://gist.github.com/)
1.  `gist` スコープを持つトークンを作成し、それをコピーしておきます (https://github.com/settings/tokens/new)
1. Twitter Developers ページで、任意のアカウントでログインします (https://developer.twitter.com/en/apps/)
   1. 新しいApp を作成するために開発者申請をします
   1. 新しいApp を作成し、consumerkey,consumersecret,accesstoken,accesssecretを取得し、それらをコピーしておきます
1. 利用したいTwitter Account をコピーしておきます

### 始めるために
1. このrepository をFork します
1. `.github/workflows/schedule.yml` の[環境変数](https://github.com/ivgtr/twitter-box/blob/master/.github/workflows/schedule.yml#L16-L23) を編集します:
   - **GIST_ID:** あなたのgist url のID部分: `https://gist.github.com/ivgtr/`**`21fd0f552ed73091f0b19c4732683805`**.
   - **TWITTER_ID:** 利用するTwitterのID
1. repository のSettings > Secrets へ行きます
1. 以下の環境変数を追加します:
   - **GH_TOKEN:** 上記で生成された GitHub トークン
   - **CONSUMER_KEY:** Twitterのconsumerkey
   - **CONSUMER_SECRET_KEY:** Twitterのconsumersecret
   - **ACCESS_KEY:** Twitterのaccesstoken
   - **ACCESS_SECRET_KEY:** Twitterのaccesssecret



## License
MIT ©[ivgtr](https://github.com/ivgtr)