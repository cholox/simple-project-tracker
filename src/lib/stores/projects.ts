// src/lib/stores/projects.js
import { writable } from 'svelte/store';

// Sample project data that could be moved to an external API or database in a real application
export const projects = writable([
  {
    id: 1,
    name: "Website Redesign",
    start_date: "2025-04-01",
    end_date: "2025-05-15",
    money_level: 2, // $$ - Medium
    promising_future: true,
    past_customer: true,
    progress: 75,
    person_in_charge: "Sarah Johnson",
    importance: ""
  },
  {
    id: 2,
    name: "Mobile App Development",
    start_date: "2025-03-15",
    end_date: "2025-06-30",
    money_level: 3, // $$$ - High
    promising_future: true,
    past_customer: false,
    progress: 30,
    person_in_charge: "David Lee",
    importance: ""
  },
  {
    id: 3,
    name: "Brand Identity",
    start_date: "2025-05-01",
    end_date: "2025-05-30",
    money_level: 1, // $ - Low
    promising_future: false,
    past_customer: true,
    progress: 60,
    person_in_charge: "Alex Wong",
    importance: ""
  },
  {
    id: 4,
    name: "SEO Optimization",
    start_date: "2025-04-20",
    end_date: "2025-05-25",
    money_level: 2, // $$ - Medium
    promising_future: true,
    past_customer: true,
    progress: 60,
    person_in_charge: "Emily Chen",
    importance: ""
  },
  {
    id: 5,
    name: "Content Strategy",
    start_date: "2025-05-05",
    end_date: "2025-06-15",
    money_level: 1, // $ - Low
    promising_future: true,
    past_customer: false,
    progress: 0,
    person_in_charge: "Michael Brown",
    importance: ""
  },
  {
    id: 6,
    name: "E-commerce Integration",
    start_date: "2025-03-01",
    end_date: "2025-05-30",
    money_level: 3, // $$$ - High
    promising_future: false,
    past_customer: true,
    progress: 95,
    person_in_charge: "Jessica Taylor",
    importance: ""
  },
//   {
//     id: 7,
//     name: "E-commerce Integration",
//     start_date: "2025-03-01",
//     end_date: "2025-05-30",
//     money_level: 3, // $$$ - High
//     promising_future: false,
//     past_customer: true,
//     progress: 95,
//     person_in_charge: "Jessica Taylor",
//     importance: ""
//   }
]);

// Functions to work with projects
export const projectUtils = {
  // Calculate days between start and end dates
  calculateDays(startDate: string | number | Date, endDate: string | number | Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  // Convert money level to dollar signs
  getMoneyLevelSymbol(level: number) {
    return "$".repeat(level);
  },

  // Get card background color based on importance
  getCardColor(importance: any) {
    switch (importance) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "high":
        return "bg-amber-50 border-amber-200";
      case "medium":
        return "bg-blue-50 border-blue-200";
      case "low":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  },

  // Get progress color based on percentage
  getProgressColor(progress: number) {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-green-500";
  }
};