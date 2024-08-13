import { Component, Directive, Inject, NgModule, OnInit, Pipe } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectFormComponent } from '../../formFolders/project-form/project-form.component';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../allServices/project.service';
import { CoreService } from '../../../app/core.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatToolbarModule, MatSnackBarModule,
    MatIconModule, MatRadioModule, MatSelectModule, NgFor, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  status: String[] = ['0', '1', '2'];
  projAddForm!: FormGroup;

  constructor(
  private matDialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {}

  

  ngOnInit(): void {
    
  }

  
  openForm(): void {
    const dialogRef = this.matDialog.open(ProjectFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Handle after close if needed
      }
    });
  }
  
  }
 


