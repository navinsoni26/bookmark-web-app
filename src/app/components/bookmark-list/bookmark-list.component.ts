import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';
import { ContextMenuItem } from 'src/app/models/context-menu-items';
import { ContextMenuComponent } from '../context-menu/context-menu.component';


@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})

export class BookmarkListComponent implements OnInit {

  @ViewChild(ContextMenuComponent) contextMenu?: ContextMenuComponent;
  @Input() bookmarks: Bookmark[] = [];
  selectedBookmarks: any[] = [];
  isCheckedAll = false;
  indeterminateState = false;
  isActive = false;
  contextMenuItems: ContextMenuItem[] = [
    { label: 'Add Tags', action: 'ADD_TAGS'},
    { label: 'Add To Favorite', action: 'ADD_TO_FAV'}
  ];
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
  onDisplayContextMenu(event: any) {
    console.log('ICON CLICKED, event = ', event);
    const targetWidth = event.target.clientWidth;
    const targetHeight = event.target.clientHeight;
    console.log(targetWidth, targetHeight);
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    const clientX = event.clientX;
    const clientY = event.clientY;
    const x = clientX - offsetX + 10;
    const y = clientY - offsetY + 30;
    this.contextMenu?.showContextMenu(event, x, y);
    // this.isActive = this.contextMenu && this.contextMenu.show ? true : false;
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

  onContextMenuClick(action: string) {
    console.log('MENU with action = ', action);
  }
}
