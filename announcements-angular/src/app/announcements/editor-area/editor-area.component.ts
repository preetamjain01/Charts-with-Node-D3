import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AnnouncementService} from '../announcement.service';

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
  styleUrls: ['./editor-area.component.scss']
})
export class EditorAreaComponent implements OnInit {

  @Output() editorText = new EventEmitter<string>();

  constructor() { }

  editorContent = 'Enter content here...';

  ngOnInit() { }

  saveEditorText() {
    this.editorText.emit(this.editorContent);
  }
}
