import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {UserServices} from '../user.service';
import {Router} from '@angular/router';
import {User} from '../signup/user.model';
import {NotificationService} from '../../shared/notification.service';
import {SpinnerService} from '../../shared/spinner.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService,
              private spinner: SpinnerService) {

  }
  user: any;
  updateForm: FormGroup;
  passwordMatchError = false;


  getEmailErrorMessage() {
    return this.updateForm.controls.email.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    return this.updateForm.controls.phone.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.phone.hasError('pattern') ? 'Not a valid Number' : '';

  }

  getPasswordErrorMessage() {
    return this.updateForm.controls.password.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.password.hasError('minlength') ? 'Password must be minimum 8 characters long' : '';
  }

  onSubmit(user: User, isValid: boolean) {
    if (isValid) {
      if (user.password !== user.confirmPassword) {
        this.passwordMatchError = true;
        return;
      }
      console.log(user);
      this.userService.updateUser(user).subscribe((data: any) => {
        this.spinner.showSpinner.next(false);
        this.notifyService.notification.next(data.message);
        this.user = data.payload.userObject;
        this.loadUserForm(this.user);
      }, error => {
        this.notifyService.notification.next(error);
        this.spinner.showSpinner.next(false);
      });
    }
  }

  loadUserForm(user: User) {
    this.updateForm = new FormGroup({
      firstname: new FormControl(this.user.firstName, [<any>Validators.required]),
      lastname: new FormControl(this.user.lastName, [<any>Validators.required]),
      email: new FormControl(this.user.email, [<any>Validators.required, <any>Validators.email]),
      phone: new FormControl(this.user.phone, [<any>Validators.required,
        <any>Validators.pattern(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)]),
      username: new FormControl(this.user.username, [<any>Validators.required]),
      password: new FormControl(this.user.password, [<any>Validators.required, <any>Validators.minLength(8)]),
      confirmPassword: new FormControl(this.user.password, [<any>Validators.required, <any>Validators.minLength(8)]),
      credits: new FormControl(this.user.credits),
      _id: new FormControl(this.user._id)
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadUserForm(this.user);
  }

}
