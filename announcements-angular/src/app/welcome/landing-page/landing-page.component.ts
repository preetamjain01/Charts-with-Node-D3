import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {UserServices} from '../../userservices/user.service';
import {CreditsService} from '../../shared/credits.service';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {SpinnerService} from '../../shared/spinner.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserServices,
              private creditsService: CreditsService,
              private spinner: SpinnerService) { }

  user: any;



  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.creditsService.updateCredits.subscribe(() => {
      this.updateCredits();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  updateCredits() {
    this.userService.getCredits().subscribe(userObject => {
      this.spinner.showSpinner.next(false);
      this.user = userObject;
    }, error => {
      this.spinner.showSpinner.next(false);
    });
  }

  updateForm() {
    this.router.navigate(['/welcome/updateAccount']);
  }
}
