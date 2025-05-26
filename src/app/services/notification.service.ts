import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3001'); // Adapt to your backend address
  }

  registerEncadrant(encadrantId: string) {
    this.socket.emit('registerEncadrant', encadrantId);
  }

  onSujetPropose(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('notificationSujet', (data) => {
        observer.next(data);
      });
    });
  }
}
