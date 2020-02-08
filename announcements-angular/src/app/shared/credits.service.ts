import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class CreditsService {
  public updateCredits = new Subject();
}
