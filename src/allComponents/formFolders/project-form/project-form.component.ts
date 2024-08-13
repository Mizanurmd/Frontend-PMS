import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { timeStamp } from 'console';
import { ProjectService } from '../../../allServices/project.service';
import { Router } from '@angular/router';
import { CoreService } from '../../../app/core.service';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-project-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatDatepickerModule,
    MatIconModule, MatRadioModule, MatSelectModule, NgFor,ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit {
  status: number[] = [0, 1, 2];
  members: string[] = ['Mizan', 'Biswhjit', 'Sumon', 'Kamal', 'Atick', 'Rony'];
  proAdform!: FormGroup<any>;

  constructor(private _fb: FormBuilder,
             private proSer: ProjectService,
             private router: Router, 
             private matDialRef: MatDialogRef<ProjectFormComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any, 
            private snakMess: CoreService,
            private snackBar: MatSnackBar
          ) { }

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

    ngOnInit(): void {
      this.proAdform = this._fb.group({
        name: ['', Validators.required],
        intro: ['', Validators.required],
        owner: ['', Validators.required],
        status: ['', Validators.required],
        startDateTime: ['', Validators.required],
        endDateTime: ['', Validators.required],
        projectMembers: [[], Validators.required],  // Initialize as an empty array
      });
  
      if (this.data) {
        this.proAdform.patchValue(this.data);
      }
  
      // Debugging: Print the form controls and their statuses
      console.log('Form Controls:', this.proAdform.controls);
      this.checkFormValidity();
    }

   //================ checkFormValidity start===========
    checkFormValidity() {
      Object.keys(this.proAdform.controls).forEach(key => {
        const control = this.proAdform.get(key);
        if (control && control.invalid) {
          console.log(this.proAdform.value);
          const errors = control.errors;
          if (errors) {
            console.error(`Field: ${key}, Errors:`, errors);
          }
        }
      });
    }
//================ checkFormValidity end===========

    submitForm() {
      if (this.proAdform.valid) {
        console.log('Submitting Form Data:', this.proAdform.value);
        if (this.data) {
          // Update existing project
          this.proSer.updateProject(this.data.id, this.proAdform.value).subscribe({
            next: (res) => {
               this.openSnackBar("Project is updated successfully.", "OK");
              console.log(res);
              this.matDialRef.close(true);
            },
            error: (err) => {
              console.error('Update Error:', err);
            }
          });
  
        } else {
          // Create new project
          this.proSer.createProject(this.proAdform.value).subscribe({
            next: (res) => {
              this.openSnackBar("Project is added successfully.", "OK");
              console.log(res);
              this.matDialRef.close(true);
            },
            error: (err) => {
              console.error('Create Error:', err);
            }
          });
        }
      } else {
        console.error('Form Invalid');
        this.checkFormValidity();  // Check validity of each control
      }
    }
  
    onNoClick(): void {
      this.matDialRef.close();
    }

   

}
