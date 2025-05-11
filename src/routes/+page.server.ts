import { fetchProjectProgress } from '$lib/redmine';

export async function load() {
  const projects = await fetchProjectProgress();
//   console.log('Projects:', projects);
  return { projects };
}