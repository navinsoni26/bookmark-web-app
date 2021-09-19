import { Component, OnInit } from '@angular/core';
import { MessageType } from 'src/app/models/message.data';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  hidden = true;
  eMessageType = MessageType;
  message: any;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(
      message => {
        console.log('Message Received = ', message);
        this.hidden = false;
        this.message = message;
        setTimeout(() => {
          this.hidden = !this.hidden;
        }, 5000);
      }
    )
  }

}
