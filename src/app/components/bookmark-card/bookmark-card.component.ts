import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss']
})
export class BookmarkCardComponent implements OnInit {
  @Input() bookmark: Bookmark = new Bookmark() ;
  @Output() isBookmarkSelectedEvent = new EventEmitter<boolean>();
  @Input() isChecked = false;
  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxChange(event: any){
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
    this.isBookmarkSelectedEvent.emit(this.isChecked);
  }

}
