import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Output() closeDialogEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.closeDialogEvent.emit();
  }

}
