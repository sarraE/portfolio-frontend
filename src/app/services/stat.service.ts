import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  readonly apiUrl = environment.apiUrl
  constructor(private httpClient : HttpClient) { }

  recordVisit(page : string) : Observable<void>{
    return this.httpClient.post<void> (`${this.apiUrl}/recordVisit/${page}`,null);
  }

  getCount(page : string) : Observable<number>{
    return this.httpClient.get<number> (`${this.apiUrl}/getCount/${page}`);
  }
}
