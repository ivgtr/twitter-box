import { getTwitterData } from "./getTwitterData";
import { updateGist } from "./updateGist";

const main = async () => {
  if (!process.env.CI) {
    (await import("dotenv")).config();
  }

  const {
    GIST_ID: gistId,
    GH_TOKEN: githubToken,
    TWITTER_ID: twitterId,
    TWITTER_TOKEN: twitterToken,
  } = process.env;

  if (!(gistId && githubToken && twitterId && twitterToken)) {
    console.error("設定が完了していません");
    return;
  }
  const resultText = await getTwitterData({ twitterId, twitterToken });
  await updateGist(resultText, { gistId, githubToken, twitterId });
};

main();
