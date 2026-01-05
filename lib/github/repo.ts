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

const repoQuery = `
  query SearchRepos($searchQuery: String!, $cursor: String) {
    search(query: $searchQuery, type: REPOSITORY, first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          nameWithOwner
          url
          description
          stargazerCount
          forkCount
          isPrivate
          createdAt
          updatedAt
          owner {
            login
            avatarUrl
          }
          primaryLanguage {
            name
            color
          }
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          nodes { name }
          }
        }
      }
    }
  }
`;

export async function getRepositories(searchQuery: string) {
  let cursor = null;
  let hasNextPage = true;
  const repos = [];

  while (hasNextPage) {
    const res: any = await githubClient(repoQuery, {
      searchQuery,
      cursor,
    });

    const search = res.search;

    if (!search || search.nodes.length === 0) break;

    repos.push(...search.nodes);

    hasNextPage = search.pageInfo.hasNextPage;
    cursor = search.pageInfo.endCursor ?? null;
  }

  return repos;
}

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
