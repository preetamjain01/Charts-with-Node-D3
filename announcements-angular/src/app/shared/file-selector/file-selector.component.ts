import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  data: any;


  constructor() { }

  @Output() onFileSelected = new EventEmitter<any>();

  ngOnInit() {}

  onAction(event) {
    console.log('File uploaded', event);
    this.onFileSelected.emit(event.file);
  }

}
