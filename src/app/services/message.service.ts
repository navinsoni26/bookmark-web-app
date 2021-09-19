import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message, MessageType } from '../models/message.data';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  _messageSubject: Subject<Message> = new Subject<Message>()
  constructor() { }

  setMessage(message: Message) {
    this._messageSubject.next(message);
  }

  getMessage() {
    return this._messageSubject;
  }

  successMessage(text: string) {
    this.setMessage({type: MessageType.Success, text});
  }

  errorMessage(text: string) {
    this.setMessage({type: MessageType.Error, text});
  }

  warningMessage(text: string) {
    this.setMessage({type: MessageType.Warning, text});
  }

  infoMessage(text: string) {
    this.setMessage({type: MessageType.Info, text});
  }
}
