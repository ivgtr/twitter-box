import { Octokit } from '@octokit/rest'
import * as dotenv from 'dotenv'
import dayjs from 'dayjs'
import axios from 'axios'

dotenv.config()

type tweetCountData = {
  tweetCount: number
  rtCount: number
  lastId?: number
  countOver: boolean
}

type timeline = {
  created_at: string
  retweeted_status: string
  id: number
  text: string
}

type getRequestParams = {
  screen_name: string
  count: number
  trim_user: boolean
  max_id?: number
}

const {
  GIST_ID: gistId,
  GH_TOKEN: githubToken,
  TWITTER_ID: twitterId,
  TWITTER_TOKEN: twitterToken
} = process.env

const octokit = new Octokit({ auth: `token ${githubToken}` })

const requestTwitterTimeline = async (
  totalTimelineData: tweetCountData = {
    tweetCount: 0,
    rtCount: 0,
    lastId: undefined,
    countOver: false
  }
): Promise<tweetCountData> => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`
  }

  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  const count = 100

  let url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

  const params: getRequestParams = {
    screen_name: twitterId as string,
    count,
    trim_user: true
  }

  const timelineData: tweetCountData = await new Promise((resolve, reject) => {
    if (totalTimelineData.lastId) {
      url += `&max_id=${totalTimelineData.lastId}`
    }
    axios
      .get(url, {
        headers,
        params
      })
      .then((response) => response.data)
      .then((result: timeline[]) => {
        let { tweetCount } = totalTimelineData
        let { rtCount } = totalTimelineData
        result.map((tweet: timeline) => {
          if (dayjs(tweet.created_at).format('YYYY-MM-DD') === yesterday) {
            tweetCount += 1
            if (tweet.retweeted_status) {
              rtCount += 1
            }
          }
          return tweet
        })
        const lastData = result.slice(-1)[0]

        const countOver = dayjs(lastData.created_at).format('YYYY-MM-DD') === yesterday
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

const truncateText = (str: string, len: number) => {
  return str.length <= len ? str : `${str.substr(0, str.length - 3)}...`
}

const getTweetData = async () => {
  const countData = await requestTwitterTimeline()
  const yesterday = dayjs().subtract(1, 'day').format('MM-DD')
  const resizeTwitterId = truncateText(twitterId as string, 19)

  const resultText = `@${resizeTwitterId} ${yesterday}のポスト数 : ${countData.tweetCount} (うちRT : ${countData.rtCount})`
  return resultText
}
const updateGist = async (text: string) => {
  let gist
  try {
    gist = await octokit.gists.get({ gist_id: gistId as string })
  } catch (error) {
    console.error(`Unable to get gist\n${error}`)
  }

  try {
    if (!gist) throw new Error()
    // Get original filename to update that same file
    const filename = Object.keys(gist.data.files as any)[0]
    await octokit.gists.update({
      gist_id: gistId as string,
      files: {
        [filename]: {
          filename: `📊 Data of yesterday's tweets by @${twitterId}`,
          content: text
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
