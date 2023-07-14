import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-add-edit',
  templateUrl: './event-add-edit.component.html',
  styleUrls: ['./event-add-edit.component.css']
})
export class EventAddEditComponent implements OnInit {
  eventForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EventAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventsService: EventsService
  ) {
    this.eventForm = this._fb.group({
      name: '',
      location: '',
      date: ''
    });
  }

  ngOnInit(): void {
    this.eventForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.eventForm.valid) {
      // if (this.data) {
      //   this._empService
      //     .updateEmployee(this.data.id, this.empForm.value)
      //     .subscribe({
      //       next: (val: any) => {
      //         this._coreService.openSnackBar('Employee detail updated!');
      //         this._dialogRef.close(true);
      //       },
      //       error: (err: any) => {
      //         console.error(err);
      //       },
      //     });
      // } else {
      //   this._empService.addEmployee(this.empForm.value).subscribe({
      //     next: (val: any) => {
      //       this._coreService.openSnackBar('Employee added successfully');
      //       this._dialogRef.close(true);
      //     },
      //     error: (err: any) => {
      //       console.error(err);
      //     },
      //   });
      // }

      this.eventsService.createEvent(this.eventForm.value)
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
      });
      console.log("Form Submitted!")
      console.log(this.eventForm.value)
    }
  }

}
