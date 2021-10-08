import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestWithToken = request.clone({
      setHeaders: { 'Authorization': `Bearer ${this.authService.TOKEN}` }
    });

    return next.handle(requestWithToken)
      .pipe(
        catchError(
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                console.log('interceptor 401');
                this.authService.logout();
                this.router.navigateByUrl('/');
              }
              // if (error.status === 403) {
              //   this.authService.logout();
              // }
            } else {
              console.log('error X');
              // return throwError(error);
            }
            return new Observable<HttpEvent<any>>();
          }
        )
      );
  }
}
