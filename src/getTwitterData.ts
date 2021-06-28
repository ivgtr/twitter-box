import axios from "axios";
import dayjs from "dayjs";

type TweetCountData = {
  tweetCount: number;
  rtCount: number;
  maxId?: number;
};

type Timeline = {
  created_at: string;
  retweeted_status: string;
  id: number;
  text: string;
};

type RequestParams = {
  screen_name: string;
  count: number;
  trim_user: boolean;
  max_id?: number;
};

const YESTERDAY = dayjs().subtract(1, "day").format("YYYY-MM-DD");
const COUNT = 100;
const BASE_URL = "https://api.twitter.com/1.1/statuses/user_timeline.json";

const requestTwitterTimeline = async (
  options: {
    params: RequestParams;
    headers: { Authorization: string };
  },
  countData: TweetCountData = {
    tweetCount: 0,
    rtCount: 0,
    maxId: undefined,
  }
): Promise<TweetCountData> => {
  let featureURL = BASE_URL;
  if (countData.maxId) {
    featureURL += `&max_id=${countData.maxId}`;
  }

  const timelineData = await axios
    .get(featureURL, options)
    .then<Timeline[]>((response) => response.data);

  timelineData.forEach((tweet) => {
    const tweetDate = dayjs(tweet.created_at).format("YYYY-MM-DD");
    if (tweetDate === YESTERDAY) {
      countData.tweetCount += 1;
      if (tweet.retweeted_status) {
        countData.rtCount += 1;
      }
    }
  });

  const lastTweet = timelineData[timelineData.length - 1];
  const lastDate = dayjs(lastTweet.created_at).format("YYYY-MM-DD");

  if (lastDate === YESTERDAY) {
    return requestTwitterTimeline(options, { ...countData, maxId: lastTweet.id });
  }

  return countData;
};

const truncateText = (str: string, len: number) =>
  str.length <= len ? str : `${str.substr(0, str.length - 3)}...`;

export const getTwitterData = async ({
  twitterId,
  twitterToken,
}: {
  twitterId: string;
  twitterToken: string;
}) => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`,
  };

  const defaultParams: RequestParams = {
    screen_name: twitterId,
    count: COUNT,
    trim_user: true,
  };

  const countData = await requestTwitterTimeline({ params: defaultParams, headers });
  const yesterday = dayjs().subtract(1, "day").format("MM-DD");
  const resizeTwitterId = truncateText(twitterId, 19);

  const resultText = `@${resizeTwitterId} ${yesterday}のポスト数 : ${countData.tweetCount} (うちRT : ${countData.rtCount})`;
  return resultText;
};
