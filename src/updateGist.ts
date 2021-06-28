import { Octokit } from "@octokit/rest";

export const updateGist = async (
  text: string,
  env: { gistId: string; githubToken: string; twitterId: string }
) => {
  const octokit = new Octokit({ auth: `token ${env.githubToken}` });

  try {
    const gist = await octokit.gists.get({ gist_id: env.gistId });

    // Get original filename to update that same file
    const filename = Object.keys(gist.data.files as any)[0];
    await octokit.gists.update({
      gist_id: env.gistId,
      files: {
        [filename]: {
          filename: `📊 Data of yesterday's tweets by @${env.twitterId}`,
          content: text,
        },
      },
    });
  } catch (error) {
    console.error(`Unable to get gist\n${error}`);
  }
};
