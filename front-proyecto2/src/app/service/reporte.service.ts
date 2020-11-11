import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

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

  public getAllTopPublicacion() : Observable<any> {
    let url = `${this.basePath}reporte/top/publicaciones`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllTopDenuncias() : Observable<any> {
    let url = `${this.basePath}reporte/top/denuncias`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllTopMasCredito() : Observable<any> {
    let url = `${this.basePath}reporte/mas/credito`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllTopMenosCredito() : Observable<any> {
    let url = `${this.basePath}reporte/menos/credito`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllTopMasMeGusta() : Observable<any> {
    let url = `${this.basePath}reporte/mas/gusta`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllTopMasNoMeGusta() : Observable<any> {
    let url = `${this.basePath}reporte/mas/nogusta`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllProductoMasVendido() : Observable<any> {
    let url = `${this.basePath}reporte/mas/producto`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getAllPaises() : Observable<any> {
    let url = `${this.basePath}reporte/paises`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

}