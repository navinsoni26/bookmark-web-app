import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark';
import { Collection } from 'src/app/models/collection';
import { ContextMenuItem } from 'src/app/models/context-menu-items';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { TagService } from 'src/app/services/tag.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';


@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})

export class BookmarkListComponent implements OnInit {

  @ViewChild(ContextMenuComponent) contextMenu?: ContextMenuComponent;
  bookmarks: Bookmark[] = [];
  selectedBookmarks: any[] = [];  // bookmarks selected by user
  isCheckedAll = false;   // for global checkbox
  indeterminateState = false;   // for global checkbox
  isActive = false;
  showFilterByTagSection = false;   // to show filter by tags section
  isCollectionDataDisplayed = true; // whether collection data is displayed or tags data is displayed

  collectionId: string = '';  // To store current Collection ID,
  collectionName: string = '';  // To store current collection name

  tagsMap = new Map();
  selectedTags: any[] = [];  // this variable will store tags selected by user for filtering

  contextMenuItems: ContextMenuItem[] = [
    { label: 'Add Tags', action: 'ADD_TAGS' },
    { label: 'Add To Favorite', action: 'ADD_TO_FAV' }
  ];
  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.collectionId = params.get('id') || '';
        this.collectionName = params.get('name') || '';
        this.isCollectionDataDisplayed = true;
        // this.getBookmarks();
        this.getBookmarksByCollection();
      }
    )
  }

  getBookmarks() {
    this.bookmarkService.getBookmarks().subscribe(
      res => {
        this.bookmarks = res as Bookmark[];
      }
    )
  }

  getBookmarksByCollection() {
    this.bookmarkService.getBookmarksByCollection(this.collectionId).subscribe(
      res => {
        this.bookmarks = res as Bookmark[];
      }
    )
  }

  onBookmarkChecked(checked: any, id: any) {
    console.log('Checked = ', checked, id);
    if (checked) {
      // add id to selected list
      this.selectedBookmarks.push(id);
    } else {
      // remove id from selected list
      this.selectedBookmarks = this.selectedBookmarks.filter(item => item != id);
    }
    if (this.selectedBookmarks.length !== 0 && this.selectedBookmarks.length !== this.bookmarks.length) {
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
    if (this.indeterminateState && this.isCheckedAll) {
      this.isCheckedAll = false;
      this.ref.detectChanges();
      this.isCheckedAll = true;
    } else {
      this.isCheckedAll = this.indeterminateState ? true : !this.isCheckedAll;
    }

    this.indeterminateState = false;
    if (this.isCheckedAll) {
      this.selectedBookmarks = this.bookmarks.map(bookmark => bookmark.id);
    } else {
      this.selectedBookmarks = [];
    }
  }

  onContextMenuClick(action: string) {
    console.log('MENU with action = ', action);
  }

  onShowFilterByTag() {
    this.tagsMap = new Map();
    this.showFilterByTagSection = true;
    this.tagService.getTags().subscribe(
      (tags: any) => {
        tags.forEach((tag: any) => {
          tag.isActive = false;
          const key = tag.name.charAt(0);
          const keyExist = this.tagsMap.has(key);
          if(keyExist) {
            const values = this.tagsMap.get(key);
            values.push(tag);
          } else {
            this.tagsMap.set(key, [tag]);
          }
        });
        console.log('TagsMap = ', this.tagsMap);
      }
    )
  }

  onCloseFilterByTag() {
    this.showFilterByTagSection = false;
  }

  onTagItemClicked(clickedTag: any) {
    this.isCollectionDataDisplayed = false;
    clickedTag.isActive = !clickedTag.isActive;
    this.selectedTags = [...this.selectedTags, clickedTag];
    // this.selectedTags.push(clickedTag);
  }
}
