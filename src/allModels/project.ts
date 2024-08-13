export interface Project {
    id?: number;
    name: string;
    intro: string;
    owner?: { id: number }; // Assuming owner is just a reference with an id
    status: number; // 0: pre, 1: start, 3: end
    startDateTime: string; // ISO date string
    endDateTime: string; // ISO date string
    projectMembers?: { id: number }[]; // List of users with just an id
    createdAt?: string; // ISO date string
    updatedAt?: string; // ISO date string
  }