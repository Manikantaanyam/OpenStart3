import githubClient from "./client";

type RepoResponse = {
  repository: {
    name: string;
    nameWithOwner: string;
    description: string | null;
    stargazerCount: number;
    updatedAt: string;
    owner: {
      avatarUrl: string;
    };
    languages: {
      nodes: { name: string }[];
    };
  };
};

export async function fetchRepo(owner: string, name: string) {
  const query = `
    query GetRepo($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        name
        nameWithOwner
        description
        stargazerCount
        updatedAt
        owner { avatarUrl }
        languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          nodes { name }
        }
      }
    }
  `;

  const data = await githubClient<RepoResponse>(query, {
    owner,
    name,
  });

  return data.repository;
}
