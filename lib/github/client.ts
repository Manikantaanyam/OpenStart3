import { graphql } from "@octokit/graphql";

const githubClient = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
  },
});

export default githubClient;
