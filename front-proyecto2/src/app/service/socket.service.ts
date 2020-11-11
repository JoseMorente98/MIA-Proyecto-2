import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://192.168.1.101:3000';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  public send(message: any): void {
      this.socket.emit('enviarMensaje', message);
  }

  public onMessage(): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on('enviarMensaje', (data: any) => observer.next(data));
      });
  }

  public onEvent(event: any): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on(event, () => observer.next());
      });
  }
}
