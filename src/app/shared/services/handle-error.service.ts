import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HandleErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(error);
      if (error.error.error_description) {
        return new ErrorObservable(
          error.error.error_description);
      }
      if (error.error.Message) {
        return new ErrorObservable(
          error.error.Message);
      }
      if (error.status === 0) {
        return 'Error accessing server.';
      }
      if (error.error) {
        return new ErrorObservable(
          error.error);
      }
    }
    // return an ErrorObservable with a user-facing error message
    return  'Something bad happened; please try again later.';
  }

}
