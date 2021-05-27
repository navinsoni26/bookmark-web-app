import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';

enum CheckboxState {
  NONE,
  FEW,
  ALL
};

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})

export class BookmarkListComponent implements OnInit {

  @Input() bookmarks: Bookmark[] = [];
  eCheckboxState = CheckboxState;
  selectedBookmarks: any[] = [];
  isCheckedAll = false;
  checkboxState = CheckboxState.NONE;
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
    console.log('Selected Bookmarks = ', this.selectedBookmarks);
    if(this.selectedBookmarks.length === 0) {
      this.checkboxState = CheckboxState.NONE;
      this.isCheckedAll = false;
    } else if(this.selectedBookmarks.length === this.bookmarks.length) {
      this.checkboxState = CheckboxState.ALL;
      this.isCheckedAll = true;
    } else {
      this.checkboxState = CheckboxState.FEW;
    }
  }

  onGlobalCheckboxChecked(value: any) {
    switch(value) {
      case CheckboxState.NONE:
      case CheckboxState.FEW:
        this.isCheckedAll = true;
        this.selectedBookmarks = this.bookmarks.map(bookmark => bookmark.id);
        this.checkboxState = CheckboxState.ALL;
        break;
      case CheckboxState.ALL:
        this.isCheckedAll = false;
        this.selectedBookmarks = [];
        this.checkboxState = CheckboxState.NONE;
    }

    // TODO: Select All, then unselect one and again click on Select All
    console.log('Selected Bookmarks = ', this.selectedBookmarks);
  }
}
