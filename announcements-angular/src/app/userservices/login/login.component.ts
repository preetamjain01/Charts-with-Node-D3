import { Component, OnInit } from '@angular/core';
import {UserServices} from '../user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../shared/notification.service';
import {SpinnerService} from '../../shared/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService,
              private spinner: SpinnerService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, Validators.minLength(8)])
    });
  }

  getPasswordError() {
    return this.loginForm.controls.password.hasError('required') ? 'Password is required' :
      this.loginForm.controls.password.hasError('minlength') ? 'Password should be minimum 8 characters long' : '';
  }

  login(credentials: {username, password}, isValid: boolean) {
    if (isValid) {
      this.userService.login(credentials.username, credentials.password).subscribe((data: any) => {
        this.spinner.showSpinner.next(false);
        this.notifyService.notification.next(data.message);
        this.router.navigate(['/welcome']);
      }, error => {
        this.spinner.showSpinner.next(false);
        this.notifyService.notification.next(error);
      });
    }
  }
}
