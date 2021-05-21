import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss']
})
export class BookmarkCardComponent implements OnInit {
  @Input() bookmark: Bookmark = new Bookmark() ;
  constructor() { }

  ngOnInit(): void {
  }

}
