import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserServices} from '../user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';
import {SpinnerService} from '../../shared/spinner.service';

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit {

  addCreditsForm: FormGroup;
  availableCredits;

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService,
              private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.addCreditsForm = new FormGroup({
      credits: new FormControl('', [<any>Validators.required])
    });
    this.getCredits();
  }

  addCredits(creds: { credits }, isValid: boolean) {
    if (isValid) {
      this.userService.addCredits(creds.credits).subscribe((data: any) => {
        this.spinner.showSpinner.next(false);
        this.availableCredits = data.credits;
        this.notifyService.notification.next('Credits added successfully');
      }, error => {
        this.spinner.showSpinner.next(false);
        this.notifyService.notification.next(error);
      });
    }
  }

  getCredits() {
    this.userService.getCredits().subscribe((data: any) => {
      this.spinner.showSpinner.next(false);
      this.availableCredits = data.credits;
    }, error => {
      this.spinner.showSpinner.next(false);
      this.notifyService.notification.next(error);
    });
  }

}
