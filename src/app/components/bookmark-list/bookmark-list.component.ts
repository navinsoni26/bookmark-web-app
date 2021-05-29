import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';


@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})

export class BookmarkListComponent implements OnInit {

  @Input() bookmarks: Bookmark[] = [];
  selectedBookmarks: any[] = [];
  isCheckedAll = false;
  indeterminateState = false;
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onBookmarkChecked(checked:any, id:any) {
    console.log('Checked = ', checked, id);
    if(checked) {
      // add id to selected list
      this.selectedBookmarks.push(id);
    } else {
      // remove id from selected list
      this.selectedBookmarks = this.selectedBookmarks.filter(item => item != id);
    }
    if(this.selectedBookmarks.length !== 0 && this.selectedBookmarks.length !== this.bookmarks.length) {
      this.indeterminateState = true;
    } else {
      this.indeterminateState = false;
      this.isCheckedAll = this.selectedBookmarks.length === 0 ? false : true;
    }
    
  }

  onGlobalCheckboxChecked() {
    if(this.indeterminateState && this.isCheckedAll) {
      this.isCheckedAll = false;
      this.ref.detectChanges();
      this.isCheckedAll = true;
    } else {
      this.isCheckedAll = this.indeterminateState ? true : !this.isCheckedAll;
    }
    
    this.indeterminateState = false;
    if(this.isCheckedAll) {
      this.selectedBookmarks = this.bookmarks.map(bookmark => bookmark.id);
    } else {
      this.selectedBookmarks = [];
    }
  }
}
