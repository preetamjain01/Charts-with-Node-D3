import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../shared/appConstants';
import 'rxjs/add/operator/map';
import {User} from './signup/user.model';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators';
import {SpinnerService} from '../shared/spinner.service';
import {Observable} from 'rxjs/Observable';
import {$} from 'protractor';
import {CreditsService} from '../shared/credits.service';


@Injectable()
export class UserServices {

  constructor(private http: HttpClient,
              private appConstants: AppConstants,
              private spinner: SpinnerService,
              private updateDisplayCredits: CreditsService) {

  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      error.error.message || 'Something went wrong; please try again later.');
  }

//Function to get the user logged in
  login(username: string, password: string) {

    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers: this.appConstants.headers
    };

    const body = {
      'username': username,
      'password': password
    };

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/authenticate`, body, httpOptions)
      .map((result: any) => {
        this.spinner.showSpinner.next(false);
        if (result.success) {
          console.log(result);
          localStorage.setItem('secretToken', result.payload.token);
          localStorage.setItem('user', JSON.stringify(result.payload.userObject));
          return result;
        }
      }).pipe(catchError(this.handleError));
  }

  //Function to create user through backend and display the pop up
  createUser(userInfo: User) {

    this.spinner.showSpinner.next(true);

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/createUser`, userInfo)
      .map((result: any) => {
        this.spinner.showSpinner.next(false);
        if (result.success) {
          return result;
        }
      }).pipe(catchError(this.handleError));

  }

  //Function to reset the password through email
  resetPassword(emailFormControl: string) {

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const body = {
      'email': emailFormControl
    };

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/resetPassword`, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Update the user according to the changes done by the user
  updateUser(user: User) {

    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/updateUser/${user._id}`, user, httpOptions).map((result: any) => {
      this.spinner.showSpinner.next(false);
      if (result.success) {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.payload.userObject));
        return result;
      }
    }).pipe(catchError(this.handleError));
  }

  deleteUser() {
    this.spinner.showSpinner.next(true);
    const httpOptions = {
      headers: this.appConstants.privateHeaders
    };

    return this.http.delete(`${this.appConstants.USER_ENDPOINT}/deleteUser`, httpOptions).map((result: any) => {
      if (result.success) {
        console.log(result);
        this.spinner.showSpinner.next(false);
        return result;
      }
    }).pipe(catchError(this.handleError));
  }

//Check if user is already present
  isAuthenticated() {
    return localStorage.getItem('secretToken') ? true : false;
  }

  //to get the current wallet credits pending
  getCredits() {

    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    return this.http.get(`${this.appConstants.USER_ENDPOINT}/getCredits/`, httpOptions).map((result: any) => {
      this.spinner.showSpinner.next(false);
      if (result.success) {
        console.log(result);
        let user = JSON.parse(localStorage.getItem('user'));
        user.credits = result.payload;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    }).pipe(catchError(this.handleError));
  }

//function to add the credits to the user
  addCredits(credits) {
    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const body = {
      credits
    };

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/addCredits/`, body, httpOptions).map((result: any) => {
      if (result.success) {
        console.log(result);
        let user = JSON.parse(localStorage.getItem('user'));
        user.credits = result.payload;
        localStorage.setItem('user', JSON.stringify(user));
        this.updateDisplayCredits.updateCredits.next();
        return user;
      }
    }).pipe(catchError(this.handleError));
  }
}
