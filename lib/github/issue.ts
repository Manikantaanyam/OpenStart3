import githubClient from "./client";

type IssueNode = {
  id: string;
  number: number;
  title: string;
  state: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  labels: {
    nodes: { name: string }[];
  };
};

type SearchResponse = {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    nodes: IssueNode[];
  };
};

const SEARCH_ISSUES_QUERY = `
  query SearchIssues($SearchQuery: String!, $cursor: String) {
    search(type: ISSUE, query: $SearchQuery, first: 100, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Issue {
          id
          number
          title
          state
          createdAt
          updatedAt
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export async function fetchIssues(queryString: string) {
  let hasNextPage = true;
  let cursor: string | null = null;

  const allIssues: {
    githubId: string;
    number: number;
    title: string;
    state: "OPEN" | "CLOSED";
    createdAt: Date;
    updatedAt: Date;
    labels: string[];
  }[] = [];

  while (hasNextPage) {
    const data: any = await githubClient(SEARCH_ISSUES_QUERY, {
      SearchQuery: queryString,
      cursor,
    });

    for (const issue of data.search.nodes) {
      allIssues.push({
        githubId: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state,
        createdAt: new Date(issue.createdAt),
        updatedAt: new Date(issue.updatedAt),
        labels: issue.labels.nodes.map((l: any) => l.name),
      });
    }

    hasNextPage = data.search.pageInfo.hasNextPage;
    cursor = data.search.pageInfo.endCursor;
  }

  return allIssues;
}
