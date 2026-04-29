import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly apiUrl = 'https://portfolio-backend-production-0ef6.up.railway.app';
  constructor(private httpClient: HttpClient) { }

  getAllMessages() : Observable<Message[]>{
    return this.httpClient.get<Message[]>(`${this.apiUrl}/getAllMessages`);
  }

  sendMessage(message : Message) : Observable<Message>{
    return this.httpClient.post<Message> (`${this.apiUrl}/sendMessage`,message).pipe(
  timeout(30000)
);
  }

  countNotRead() : Observable<number>{
    return this.httpClient.get<number> (`${this.apiUrl}/countNotRead`);
  }

  markedRead(id : number) : Observable<void> {
    return this.httpClient.put<void> (`${this.apiUrl}/markedRead/${id}`, null);
  }

  
}
