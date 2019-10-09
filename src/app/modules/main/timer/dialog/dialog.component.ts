import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  dialogForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  setValue() {
    this.data = this.dialogForm.value.name;
  }
}
