import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../shared/appConstants';
import 'rxjs/add/operator/map';
import {SpinnerService} from '../shared/spinner.service';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ChartService {

  constructor (private http: HttpClient,
               private appConstants: AppConstants,
               private spinner: SpinnerService) {
  }

  private handleError(error: HttpErrorResponse) {
    this.spinner.showSpinner.next(false);
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

  /**
   *  Function to create bar chart with user data.
   * @param file - CSV file uploaded by user
   * @param values - User selected config for chart
   * @returns {Promise<any>}resolving to pie chart
   */

  //Function to retrieve the create bar chart function and getting the output
  createBarChart (values, file) {

    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('barChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createBarChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          this.spinner.showSpinner.next(false);
          return result.payload;
        }
      }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   *  Function to create pie chart with user data.
   * @param file - CSV file uploaded by user
   * @param values - User selected config for chart
   * @returns {Promise<any>}resolving to pie chart
   */
  //Function to retrieve the create pie chart function and getting the output
  createPieChart (values, file) {
    this.spinner.showSpinner.next(true);
    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('pieChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createPieChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          this.spinner.showSpinner.next(false);
          return result.payload;
        }
      }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   *  Function to create line chart with user data.
   * @param file - CSV file uploaded by user
   * @param values - User selected config for chart
   * @returns {Promise<any>}resolving to line chart
   */

  //Function to retrieve the create line chart function and getting the output
  createLineChart (values, file) {

    this.spinner.showSpinner.next(true);
    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('lineChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createLineChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          this.spinner.showSpinner.next(false);
          return result.payload;
        }
      }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * Function to save generated chart
   * @param chartData
   * @returns {Observable<any>}
   */
  saveGeneratedChart (chartData: any) {
    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken'),
        'Content-Type': 'application/json'})
    };

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/saveChart`, chartData, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }

    /**
     *  Function to create donut chart with user data.
     * @param file - CSV file uploaded by user
     * @param values - User selected config for chart
     * @returns {Promise<any>}resolving to donut chart
     */

    //Function to retrieve the create donut chart function and getting the output
  createDonutChart (values, file) {

    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('donutChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createDonutChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
            this.spinner.showSpinner.next(false);
            return result.payload;
        }
      }).pipe(catchError(this.handleError.bind(this)));

  }
}
