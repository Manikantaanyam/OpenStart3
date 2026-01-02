export default async function fetchPaginatedIssues(cursor?: string) {
  const response = await fetch(`/api/issues?cursor=${cursor ?? ""}`);
  const data = await response.json();
  return data;
}
