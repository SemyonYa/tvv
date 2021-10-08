import { HttpClient, HttpErrorResponse } from '@angular/common/http/http'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { UiService } from '../ui.service';


export abstract class RestService<T extends { id: number }> {
  list$ = new BehaviorSubject<T[]>(null);

  private errorTimeout: any;
  protected route: string;

  protected get url(): string { return `${environment.baseUrl}${this.route}`; }


  protected tConstructor = (item: any): T => {
    return this.responseToCamelCase(item) as T;
  }

  protected formValueToSnake = (formValue: any) => {
    let newValue = {};
    for (let key in formValue) {
      newValue[key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)] = (typeof formValue[key] === 'boolean')
        ? 1
        : formValue[key]
    }
    return newValue;
  }

  protected responseToCamelCase = (response: any) => {
    var newObj = {};
    for (let d in response) {
      if (response.hasOwnProperty(d)) {
        newObj[d.replace(/(\_\w)/g, function (k) {
          return k[1].toUpperCase();
        })] = response[d];
      }
    }
    return newObj;
  }

  handleError = (err: HttpErrorResponse) => {
    if (this.errorTimeout) clearTimeout(this.errorTimeout);

    let errorText: string;

    if (err.status === 422) {
      errorText = (err.error as any[]).map(e => e.message).join('\n');
    }
    else if (err.status < 500 && err.status >= 400) {
      errorText = err.message;
    } else {
      errorText = 'It\'s a SAD  :-(';
    }

    this.list$.next([]);

    this.ui.showError(`${errorText}`);
    this.errorTimeout = setTimeout(() => {
      this.ui.hideError();
    }, 5000);
  }

  constructor(protected http: HttpClient, protected ui: UiService) { }

  getAll(): void {
    this.list$.next(null);
    this.http.get<T[]>(this.url)
      .pipe(
        map(
          (items: any[]): T[] => {
            return items.map(this.tConstructor) as T[];
          }
        )
        // catchError(err => {
        //   console.log(err);
        //   return throwError(err);
        // })
      )
      .subscribe(
        items => {
          this.list$.next(items);
        },
        this.handleError,
        // err => {
        //   console.log(err);
        // }
      )
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`)
      .pipe(
        map(this.tConstructor)
      );
  }

  post(item: T): Observable<T> {
    return this.http.post<T>(this.url, this.formValueToSnake(item))
      .pipe(
        map(this.tConstructor)
      );
  }

  put(item: T, id: number): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, this.formValueToSnake(item))
      .pipe(
        map(this.tConstructor)
      );
  }

  patch(partialItem: Partial<T>, id: string): Observable<T> {
    return this.http.patch<T>(`${this.url}/${id}`, this.formValueToSnake(partialItem))
      .pipe(
        map(this.tConstructor)
      );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}`)
      .pipe(
        map(this.tConstructor)
      );
  }
}
