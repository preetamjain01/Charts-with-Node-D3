import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-box',
  template: `<div>
    <h2 mat-dialog-title>Congratulations!!</h2>
    <div>You have successfully created an Announcement and used 1 credit for it.</div>
  </div>`,
  styleUrls: ['./model-box.component.scss']
})
export class ModelBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
