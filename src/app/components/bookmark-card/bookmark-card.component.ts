import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';
import { CardAction } from 'src/app/models/constants';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss']
})
export class BookmarkCardComponent implements OnInit {
  @Input() bookmark: Bookmark = new Bookmark() ;
  @Input() isChecked = false;
  @Output() isBookmarkSelectedEvent = new EventEmitter<boolean>();
  @Output() onClickCardActionEvent = new EventEmitter();

  eCardAction = CardAction;

  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxChange(event: any){
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
    this.isBookmarkSelectedEvent.emit(this.isChecked);
  }

  onCardAction(action: CardAction) {
    this.onClickCardActionEvent.emit({action, bookmark: this.bookmark});
  }

}
