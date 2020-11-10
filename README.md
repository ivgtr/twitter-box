<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/43836584/98494083-64aa3780-227f-11eb-99eb-353d0e389f18.png">
  <h3 align="center">twitter-box</h3>
  <p align="center">Twitter のデータをピン留めされたgist に自動更新で表示させる</p>
</p>

---

[![Twitter Follow](https://img.shields.io/twitter/follow/mawaru_hana?style=social)](https://twitter.com/mawaru_hana) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)  

#### これは何?
Twitter のデータをピン留めされたgistに自動更新で表示させることができます 

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
   1. 新しいApp を作成し、Bearer Token をGenerate し、それをコピーしておきます
1. 利用したいTwitter Account のID をコピーしておきます

### 始めるために
1. このrepository をFork します
1. `.github/workflows/schedule.yml` の[環境変数](https://github.com/ivgtr/twitter-box/blob/master/.github/workflows/schedule.yml#L16-L23) を編集します:
   - **GIST_ID:** あなたのgist url のID部分: `https://gist.github.com/ivgtr/`**`21fd0f552ed73091f0b19c4732683805`**.
   - **TWITTER_ID:** 利用するTwitter のID
1. repository のSettings > Secrets へ行きます
1. 以下の環境変数を追加します:
   - **GH_TOKEN:** 上記で生成された GitHub トークン
   - **TWITTER_TOKEN:** Twitter のBearer Token



## License
MIT ©[ivgtr](https://github.com/ivgtr)
