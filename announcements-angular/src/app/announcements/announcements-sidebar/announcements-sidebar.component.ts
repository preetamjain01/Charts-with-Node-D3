import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {AnnouncementService} from '../announcement.service';
import {PapaParseService} from 'ngx-papaparse';
import {Receivers} from '../receivers.model';
import {SpinnerService} from '../../shared/spinner.service';

@Component({
  selector: 'app-announcements-sidebar',
  templateUrl: './announcements-sidebar.component.html',
  styleUrls: ['./announcements-sidebar.component.scss']
})
export class AnnouncementsSidebarComponent implements OnInit {

  @Output() receivers = new EventEmitter<Array<string>>();
  emailList: Array<string> = [];
  allCharts: Array<any> = [];
  emailFormControl: FormControl;
  file: File;
  fileData: any;
  showDataFields = false;
  emailField: string;
  receiversType: string;

  constructor(private annService: AnnouncementService,
              private papa: PapaParseService,
              private spinner: SpinnerService) { }

  ngOnInit() {
    this.emailFormControl = new FormControl('', [
      Validators.email,
    ]);

    this.annService.getAllCharts().subscribe((result: any) => {
      this.allCharts = result.payload;
    }, error => {
      this.spinner.showSpinner.next(false);
    });
  }

//Function to add multiple email address for one chart
  addEmail() {
    this.emailList.push(this.emailFormControl.value);
    this.emailFormControl.reset('');
    this.emailFormControl.setErrors(null);
  }

//Function to remove the email id from the list
  removeEmail(index) {
    this.emailList.splice(index, 1);
  }

  //Function to get the chart
  getData (file) {
    return new Promise((resolve, reject) => {
      this.papa.parse(file, {
        header: true,
        error: (error) => reject(error),
        complete: (data) => resolve(data)
      });
    });
  }

  //Function to get the file to be sent
  onFileSelected(file) {
    this.file = file;
    this.getData(file).then(data => {
      this.fileData = data;
      console.log('File Data', this.fileData);
      this.showDataFields = true;
    });
  }

  //Function to save the list of receivers who get the chart
  saveReceivers() {
    let emailList = [];
    if (this.receiversType === 'input' && this.emailList.length > 0) {
      emailList = this.emailList;
    } else if (this.receiversType === 'file') {
      emailList = this.fileData.data.map(email => email[this.emailField]);
    }
    this.receivers.emit(emailList);
  }
}
