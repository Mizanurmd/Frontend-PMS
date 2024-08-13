import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../allServices/project.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AuthServiceService } from '../../../../allServices/auth-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent implements OnInit {


  constructor(

  ) {}

  ngOnInit(): void {
    // Retrieve the project ID from the route parameters
   
  }



}