import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {Router} from "@angular/router";
import {UserServices} from "../user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "./user.resetpwd.model";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService) { }

  resetForm: FormGroup;
  passwordMatchError = false;

  ngOnInit() {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
      confirmPassword: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)])
    });
  }

  getPasswordErrorMessage() {
    return this.resetForm.controls.password.hasError('required') ? 'You must enter a value' :
      this.resetForm.controls.password.hasError('minlength') ? 'Password must be minimum 8 characters long' : '';
  }

  reset(user: User, isValid: boolean) {
    if (isValid) {
      if (user.newPassword !== user.confirmPassword) {
        this.passwordMatchError = true;
        return;
      }
      console.log(user);
      // let observable = this.userService.createUser(user);
      //
      // observable.subscribe((data: any) => {
      //   this.notifyService.notification.next(data.message);
      //   this.router.navigate(['/login']);
      // },
      error => {
        this.notifyService.notification.next(error);
      }
      //});
    }
  }
}
