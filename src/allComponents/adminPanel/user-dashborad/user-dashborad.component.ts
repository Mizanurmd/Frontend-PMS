import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectFormComponent } from '../../formFolders/project-form/project-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatDialogModule } from '@angular/material/dialog';

import { CurrencyPipe, NgFor } from '@angular/common';
import { Project } from '../../../allModels/project';
import { ProjectService } from '../../../allServices/project.service';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../formFolders/project-form/delete-dialog/delete-dialog.component';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { ProjectViewComponent } from '../../formFolders/project-form/project-view/project-view.component';
import { UserDetailsComponent } from '../../user-details/user-details.component';
import { ReportService } from '../../../allServices/report.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-user-dashborad',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule,
    NgFor, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, CurrencyPipe, RouterModule],
  templateUrl: './user-dashborad.component.html',
  styleUrl: './user-dashborad.component.css'
})
export class UserDashboradComponent implements OnInit {
  projcets: Project[] = [];
  displayedColumns: string[] = ['name', 'intro', 'owner', 'status', 'startDateTime', 'endDateTime', 'projectMembers', 'action'];
  dataSource!: MatTableDataSource<any>;
  data: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private matDialog: MatDialog,
    private projServ: ProjectService,
    private reportServ: ReportService,
    private snackBar: MatSnackBar,
    private router :Router,
 

  ) { }



  ngOnInit(): void {

    this.getAllProjects();
  }

  // Open add employee component
  openForm(): void {
    const dialogRef = this.matDialog.open(ProjectFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) { this.getAllProjects(); }
      },
    })
  }

  // open Edid Employee here
  openEditProject(data: any) {
    this.matDialog.open(ProjectFormComponent, {
      data,
    })
  }

  // open view Employee here
  openViewProject() {
    this.matDialog.open(ProjectViewComponent);
  }

  // Get all employees
  getAllProjects(): void {
    this.projServ.getProjectList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (er) => {
        console.log(er);
      }
    })
  }
  // Mehod for pagination and sort
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //=============Open deleteDialog box==============
  openDeleteDialog(id: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
      top: '20px'  // Adjust this value to move the dialog further down or up
    };

    const dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(id); // Call deleteProject if Yes is clicked
      }
    });
  }

  //============= delete project here=================
  deleteProject(id: number): void {
    this.projServ.deleteProjectApi(id).subscribe({
      next: (res) => {
        this.getAllProjects();  // Refresh the project list
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ========== Method to openSnackBar start==========
  openSnackBar(
    message: string,
    action: string = 'Close',
    duration: number = 5000,
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
  // ========== Method to openSnackBar end==========

  //===============Report generate method start here(10-07-2024) ===============
  generateReport(format: string): void {
    this.reportServ.generateReport(format).subscribe((data: Blob) => {
      const fileName = `report.${format}`;
      this.openSnackBar("successfully downloaded.", "OK");
      saveAs(data, fileName);
    }, error => {
      console.error('Error generating report:', error);
    });
  }



  //===============Report generate method end here(10-07-2024) ===============

 //==========viewProject method start here(10-07-2024)==========
//  viewProject(project: any): void {
//   console.log('Project data:', project);  // Check what data is being passed
//   if (project && project.id) {
//     this.router.navigate(['/view-project', project.id]);
//   } else {
//     console.error('Project ID not found or invalid project data:', project);
//   }
// }
//==========viewProject method end here(10-07-2024)==========


}
