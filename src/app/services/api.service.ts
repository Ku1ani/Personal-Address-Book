import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from '../contacts/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private getBaseUrl = 'https://localhost:44368/api';
  private url = '/Contacts/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(contact): Observable<Contact> {
    console.log('post', contact);
    return this.httpClient.post<Contact>(this.getBaseUrl + '/Contacts/', contact, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id): Observable<Contact> {
    return this.httpClient.get<Contact>(this.getBaseUrl + '/Contacts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // getAll(): Observable<any> {
  //   return this.httpClient.get<any>(this.getBaseUrl + '/Contacts/', { observe: 'response', headers, params: searchParams})
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  getAll(url: string,
         currentPage: number = 0,
         pageSize: number = 0,
         sort: any = null,
         pagination: boolean = false,
         search: string = null,
         filter: any = null,
         withParams: string[] = null): Observable<HttpResponse<any>> {

   const requestUrl = this.getBaseUrl + url;
   let searchParams = new HttpParams();

   if (pagination) {
       if (currentPage && currentPage > 0) {
           searchParams = searchParams.set('CurrentPage', '' + currentPage);
       } else {
           searchParams = searchParams.set('CurrentPage', '1');
       }

       if (pageSize && pageSize > 0) {
           searchParams = searchParams.set('PageSize', '' + pageSize);
       } else {
           searchParams = searchParams.set('PageSize', '10');
       }
   }

   if (sort) {
       if (sort instanceof Array) {
           let value = '';
           for (let i = 0; i < sort.length; i++) {
               if (i < sort.length - 1) {
                   value += sort[i].prop + ' ' + sort[i].dir + ',';
               } else {
                   value += sort[i].prop + ' ' + sort[i].dir;
               }
           }
           searchParams = searchParams.set('Orderby', value);
       } else {
           searchParams = searchParams.set('Orderby', sort.prop + ' ' + sort.dir);
       }
   }

   if (search && search.length >= 3) {
       searchParams = searchParams.set('Search', search);
   }

   if (filter) {
       const fields = Object.keys(filter);
       for (let f = 0; f < fields.length; f++) {
           searchParams = searchParams.set(fields[f], filter[fields[f]]);
       }
   }

   if (withParams && withParams.length > 0) {
       let withConcat = '';
       for (let w = 0; w < withParams.length; w++) {
           if (w < withParams.length - 1) {
               withConcat += withParams[w] + ',';
           } else if (w === withParams.length - 1) {
               withConcat += withParams[w];
           }
       }
       searchParams = searchParams.set('with', withConcat);
   }

   return this.httpClient.get<any>(requestUrl, {
       observe: 'response',
       params: searchParams,
       })
       .pipe(
          catchError(this.errorHandler)
        )
}

  update(id, contact): Observable<Contact> {
    console.log()
    return this.httpClient.put<Contact>(this.getBaseUrl + '/Contacts/' + id, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Contact>(this.getBaseUrl + '/Contacts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }



}
