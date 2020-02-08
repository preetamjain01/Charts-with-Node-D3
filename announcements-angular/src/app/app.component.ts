import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NotificationService} from './shared/notification.service';
import {SpinnerService} from './shared/spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private activate: boolean;

  constructor( private snackBar: MatSnackBar,
               private notifyService: NotificationService,
               private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.notifyService.notification.subscribe((message: string) => {
      this.openSnackBar(message);
    });

    this.spinner.showSpinner.subscribe((showSpinner: boolean) => {
      this.activate = showSpinner;
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, ' ', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
