import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';

import {Timer} from '../../../core/models/timer';
import {AuthService} from '../../../core/auth/auth.service';
import {DialogComponent} from './dialog/dialog.component';
import {InteractService} from '../../../core/service/interact.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit {

  addForm: FormGroup;
  projects: any[] = [];
  selected: string;
  timers: any[] = [];
  dataSource = new MatTableDataSource<Timer>();
  displayedColumns: string[] = ['work', 'project', 'datetime'];
  dataTableVisible = false;

  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private afs: AngularFirestore,
              private authService: AuthService,
              private user: InteractService) {
    this.refresh();
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      work: ['', Validators.required],
      project: ['', Validators.required],
      datetime: ['', Validators.required]
    });
    this.getData('projects').then();
    this.getData('timers').then();
  }

  addTimer(): void {
    if (this.addForm.invalid) {
      return;
    }
    const data = {
      work: this.addForm.value.work,
      project: this.addForm.value.project,
      datetime: this.reFormatDate(this.addForm.value.datetime[0]) + ' ~ ' + this.reFormatDate(this.addForm.value.datetime[1])
    };
    this.setData(data, 'timers').then();
    this.dataTableVisible = true;
    this.timers.push(data);
    this.refresh();
  }

  addProject(value: any): void {
    if (value === undefined) {
      return;
    }
    this.setData(value, 'projects').then();
    this.projects.push(value);
    this.selected = value;
  }

  async setData(data, path) {
    let dataToDB;
    switch (path) {
      case 'projects': {
        dataToDB = JSON.parse('{"' + data + '":true}');
        break;
      }
      case 'timers': {
        dataToDB = JSON.parse('{"' + (new Date().toISOString()) + '":' + JSON.stringify(data) + '}');
        break;
      }
    }
    await this.afs.collection(path).doc(this.user.getUser().uid).set(dataToDB, {merge: true});
  }

  async getData(path) {
    const collect = await this.afs.collection(path).doc(this.user.getUser().uid);
    return collect.get().subscribe(doc => {
      if (doc.exists) {
        switch (path) {
          case 'projects': {
            this.projects = Object.keys(doc.data());
            break;
          }
          case 'timers': {
            this.dataTableVisible = true;
            this.timers = Object.values(doc.data());
            this.refresh();
            break;
          }
        }
      }

    });
  }

  refresh(): void {
    this.dataSource.data = this.timers.reverse();
  }

  reFormatDate(str: string): string {
    const date = new Date(str);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const myFormattedDate = day + '/' + (monthIndex + 1) + '/' + year + ' ' + hours + ':' + minutes;
    if (year === 1970) {
      return '';
    } else {
      return myFormattedDate;
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';
    const dialogRef = this.matDialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      this.addProject(value);
    });
  }
}

