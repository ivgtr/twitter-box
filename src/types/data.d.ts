type countData = {
  tweetCount: number
  rtCount: number
  lastId: number
  countOver: boolean
}

type timelineData = {
  created_at: string
  retweeted_status: string
  id: number
  text: string
}

type requestParams = {
  screen_name: string
  count: number
  trim_user: boolean
  max_id?: number
}
