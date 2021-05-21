import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';
import { Collection } from 'src/app/models/collection';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  bookmarkList: Bookmark[] = [];
  collectionList: Collection[] = [];
  showDialog = true;
  constructor(private service: TestService) { }

  ngOnInit(): void {
    this.service.getBookmarks().subscribe(
      res => {
        this.bookmarkList = res as Bookmark[];
      }
    );
    this.service.getCollections().subscribe(
      res => {
        this.collectionList = res as Collection[];
      }
    );
  }

}
