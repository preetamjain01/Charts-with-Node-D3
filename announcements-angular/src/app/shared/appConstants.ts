import {HttpHeaders} from '@angular/common/http';

export class AppConstants {

  static readonly BASE_ENDPOINT: string = 'http://localhost:8080';

  readonly USER_ENDPOINT: string = `${AppConstants.BASE_ENDPOINT}/users`;

  readonly CHART_ENDPOINT: string = `${AppConstants.BASE_ENDPOINT}/charts`;

  readonly ANNOUNCEMENT_ENDPOINT: string = `${AppConstants.BASE_ENDPOINT}/announcements`;

  readonly headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });

  readonly privateHeaders: HttpHeaders = new HttpHeaders({
    'x-access-token': localStorage.getItem('secretToken'),
    'Content-Type': 'application/json'
  });

}
