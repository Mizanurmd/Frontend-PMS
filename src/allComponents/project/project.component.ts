import { Component, OnInit } from '@angular/core';
import { Project } from '../../allModels/project';
import { ProjectService } from '../../allServices/project.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, NgModelGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatDialogModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  projects: Project[] = [];
  selectedProject?: Project;
  newProject: Project = {
    name: '',
    intro: '',
    status: 0,
    startDateTime: '',
    endDateTime: ''
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjectList().subscribe(
      (projects) => this.projects = projects,
      (error) => console.error('Error loading projects', error)
    );
  }

  viewProject(id: number): void {
    this.projectService.getSinleProjAPI(id).subscribe(
      (project) => this.selectedProject = project,
      (error) => console.error('Error fetching project', error)
    );
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProjectApi(id).subscribe(
        () => this.loadProjects(),
        (error) => console.error('Error deleting project', error)
      );
    }
  }

  createProject(): void {
    if (this.newProject.name && this.newProject.intro && this.newProject.startDateTime && this.newProject.endDateTime) {
      this.projectService.createProject(this.newProject).subscribe(
() => {
          this.loadProjects();
          this.resetNewProjectForm();
          console.log(this.createProject);
        },
        (error) => console.error('Error creating project', error)
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  updateProject(id: number, projectDetails: Project): void {
    if (projectDetails.name && projectDetails.intro && projectDetails.startDateTime && projectDetails.endDateTime) {
      this.projectService.updateProject(id, projectDetails).subscribe(
        () => {
          this.loadProjects();
          this.selectedProject = undefined; // Clear the selected project after update
        },
        (error) => console.error('Error updating project', error)
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  private resetNewProjectForm(): void {
    this.newProject = {
      name: '',
      intro: '',
      status: 0,
      startDateTime: '',
      endDateTime: ''
    };
  }

}
