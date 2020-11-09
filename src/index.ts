import Twitter from 'twitter'
import { Octokit } from '@octokit/rest'
import * as dotenv from 'dotenv'
import dayjs from 'dayjs'

dotenv.config()
dayjs.locale('ja')

const {
  GIST_ID: gistId,
  GH_TOKEN: githubToken,
  TWITTER_ID: twitterId,
  CONSUMER_KEY: consumerKey,
  CONSUMER_SECRET_KEY: consumerSecretKey,
  ACCESS_KEY: accessKey,
  ACCESS_SECRET_KEY: accessSecretKey
} = process.env

const octokit = new Octokit({ auth: `token ${githubToken}` })

const client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecretKey,
  access_token_key: accessKey,
  access_token_secret: accessSecretKey
})

const requestTwitterTimeline = async (
  totalTimelineData: countData = {
    tweetCount: 0,
    rtCount: 0,
    lastId: undefined,
    countOver: false
  }
): Promise<countData> => {
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  const count = 50

  const timelineData: countData = await new Promise((resolve, reject) => {
    const params: requestParams = {
      screen_name: twitterId,
      count,
      trim_user: true
    }

    if (totalTimelineData.lastId) {
      params.max_id = totalTimelineData.lastId
    }
    client
      .get('statuses/user_timeline', params)
      .then((result: timelineData[]) => {
        let { tweetCount } = totalTimelineData
        let { rtCount } = totalTimelineData
        result.map((tweet: timelineData) => {
          if (dayjs(tweet.created_at).format('YYYY-MM-DD') === yesterday) {
            tweetCount += 1
            if (tweet.retweeted_status) {
              rtCount += 1
            }
          }
          return tweet
        })

        const lastData = result.slice(-1)[0]

        const countOver =
          dayjs(lastData.created_at).format('YYYY-MM-DD') === yesterday
        return resolve({
          tweetCount,
          rtCount,
          lastId: lastData.id,
          countOver
        })
      })
      .catch((err) => {
        return reject(err)
      })
  })

  if (timelineData.countOver) {
    return requestTwitterTimeline(timelineData)
  }

  return timelineData
}

const truncateText = (str, len) => {
  return str.length <= len ? str : `${str.substr(0, str.length - 3)}...`
}

const getTweetData = async () => {
  const countData = await requestTwitterTimeline()
  const yesterday = dayjs().subtract(1, 'day').format('MM-DD')
  const resizeTwitterId = truncateText(twitterId, 19)

  const resultText = `@${resizeTwitterId} ${yesterday}のポスト数 : ${countData.tweetCount} (うちRT : ${countData.rtCount})`
  return resultText
}
const updateGist = async (text: string) => {
  let gist
  try {
    gist = await octokit.gists.get({ gist_id: gistId })
  } catch (error) {
    console.error(`Unable to get gist\n${error}`)
  }

  if (text.length === 0) return

  try {
    // Get original filename to update that same file
    const filename = Object.keys(gist.data.files)[0]
    await octokit.gists.update({
      gist_id: gistId,
      files: {
        [filename]: {
          filename: `📊 Data of yesterday's tweets by @${twitterId}`,
          content: `${text}\n${dayjs().format('YYYY-MM-DDTHH:mm:ssZ')}`
        }
      }
    })
  } catch (error) {
    console.error(`Unable to update gist\n${error}`)
  }
}

const main = async () => {
  const resultText = await getTweetData()
  await updateGist(resultText)
}

;(async () => {
  await main()
})()
