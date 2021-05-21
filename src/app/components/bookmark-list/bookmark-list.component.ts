import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {
  @Input() bookmarks: Bookmark[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
