// src/lib/api/redmine.ts
import fs from 'fs';
import path from 'path';

export interface TimeEntry {
  id: number;
  hours: number;
  project_id: number;
  activity_id: number;
  spent_on: string;
  user: {
    id: number;
    name: string;
  };
}

export interface ProjectProgress {
  id: number;
  name: string;
  passed_days: number;
  total_spent_time: number; // Total spent time in hours
  money_level: number;
  promising_future: boolean;
  past_customer: boolean;
  progress: number;
  person_in_charge: string;
  importance: string;
  time_entry_activities: any[];
}

const REDMINE_API_KEY = import.meta.env.VITE_REDMINE_API_KEY || process.env.VITE_REDMINE_API_KEY;
const REDMINE_BASE_URL = import.meta.env.VITE_REDMINE_BASE_URL || process.env.VITE_REDMINE_BASE_URL;

// Read the local projects data from a JSON file asynchronously
const readLocalProjects = (): any[] => {
  const filePath = path.resolve('src/lib/stores/projects.json');  // Update with correct relative path
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Merge Redmine project data with local data
const mergeProjectsWithLocalData = (projects: any[], localProjects: any[]): ProjectProgress[] => {
  return projects.map((project: any) => {
    // Find the local project data based on name
    const localProject = localProjects.find((local: any) => local.name === project.name);

    // If a match is found, merge data
    return {
      id: project.id,
      name: project.name,
      passed_days: Math.floor((new Date().getTime() - new Date(project.created_on).getTime()) / (1000 * 60 * 60 * 24)),
      total_spent_time: 0,  // This will be calculated later
      money_level: localProject ? localProject.money_level : 0,  // Default to 0 if not found
      promising_future: false,
      past_customer: true,
      progress: 0,  // This will be calculated later
      person_in_charge: localProject ? localProject.assignee : 'N/A',  // Default to 'N/A' if not found
      importance: '',
      time_entry_activities: project.time_entry_activities || []
    };
  });
};

export async function fetchProjectProgress(): Promise<ProjectProgress[]> {
  const headers = {
    'X-Redmine-API-Key': REDMINE_API_KEY,
    'Content-Type': 'application/json'
  };

  // Step 1: Get all projects from Redmine API
  const projectRes = await fetch(`${REDMINE_BASE_URL}/projects.json?limit=100`, { headers });
  const { projects } = await projectRes.json();
  // console.log('Project Response:', projects);

  // Step 2: Get local project data from JSON file
  const localProjects = readLocalProjects();

  // Step 3: Merge Redmine projects with local data
  const mergedProjects = mergeProjectsWithLocalData(projects, localProjects);

  const results: ProjectProgress[] = [];

  // Iterate over each merged project to fetch issues, time entries, and calculate progress
  for (const project of mergedProjects) {
    // Step 4: Get all issues for this project
    const issuesRes = await fetch(`${REDMINE_BASE_URL}/issues.json?project_id=${project.id}&status_id=*`, { headers });
    const { issues } = await issuesRes.json();

    const total = issues.length;
    const closed = issues.filter((issue: any) => issue.status.name.toLowerCase().includes('closed')).length;
    const progress = total > 0 ? Math.round((closed / total) * 100) : 0;

    // Step 5: Get all time entries for the project
    const timeEntriesRes = await fetch(`${REDMINE_BASE_URL}/time_entries.json?project_id=${project.id}`, { headers });
    const { time_entries } = await timeEntriesRes.json();

    // Calculate the total spent time (sum of hours)
    const totalSpentTime = time_entries.reduce((sum: number, entry: TimeEntry) => sum + entry.hours, 0);

    // Time entry activities (if available from the project data)
    const time_entry_activities = project.time_entry_activities || [];

    // Step 6: Push final project data with all necessary details
    results.push({
      id: project.id,
      name: project.name,
      passed_days: project.passed_days,
      total_spent_time: totalSpentTime, // Add total spent time in hours
      money_level: project.money_level,  // Merged with local project data
      promising_future: false,
      past_customer: true,
      progress,
      person_in_charge: project.person_in_charge,  // Merged with local project data
      importance: project.importance || '', // Can be customized as needed
      time_entry_activities // Include the time entry activities from Redmine project data
    });
  }

  return results;
}
