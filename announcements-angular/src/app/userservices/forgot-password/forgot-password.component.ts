import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UserServices } from '../user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email])
    });
  }

  getEmailErrorMessage() {
    return this.resetPasswordForm.controls.emailFormControl.hasError('required') ? 'You must enter a value' :
      this.resetPasswordForm.controls.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  resetPassword(credentials: {emailFormControl}, isValid: boolean) {
    if (isValid) {
      this.userService.resetPassword(credentials.emailFormControl).subscribe((data: any) => {
        this.notifyService.notification.next(data.message);
        this.router.navigate(['/login']);
      }, error => {
        this.notifyService.notification.next(error);
      });
    }
  }
}
