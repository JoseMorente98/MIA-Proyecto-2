import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private basePath:string = path.path;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }

  //HANDLE ERROR
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: `, error.error);
    }
    return throwError(
      error);
  };

  public getAll() : Observable<any> {
    let url = `${this.basePath}denuncia`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllSingle(id:any, producto:any) : Observable<any> {
    let url = `${this.basePath}denuncia/${id}/${producto}`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  public create(data:any) : Observable<any> {
    let url = `${this.basePath}denuncia`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public update(data:any) : Observable<any> {
    let url = `${this.basePath}denuncia/${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public bloquear(data:any) : Observable<any> {
    let url = `${this.basePath}denuncia/bloquear/${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public delete(id:any) : Observable<any> {
    let url = `${this.basePath}denuncia/${id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

}