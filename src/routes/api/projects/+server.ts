// src/routes/api/projects/+server.ts
import { fetchProjectProgress } from '$lib/redmine';
import { json } from '@sveltejs/kit';

export async function GET() {
	const projects = await fetchProjectProgress();
	return json(projects);
}
