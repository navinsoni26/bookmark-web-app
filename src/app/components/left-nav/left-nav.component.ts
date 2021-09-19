import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  collections: Collection[] = [];
  expandCollapseArray: boolean[] = [];
  showDialog = false;
  isNewCollection = true;
  selectedCollection: any = null;
  constructor(
    private service: TestService,
    private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe(
      response => {
        
        this.collections = response as Collection[];
        this.collections.forEach(collection => {
          this.expandCollapseArray.push(false);
        });
        console.log('Response = ', this.collections);
      }
    )
  }

  addCollection() {
    this.isNewCollection = true;
    this.showDialog = !this.showDialog;
  }

  onCloseDialog(value: any) {
    if(value) {
      // reload required
    } else {
      // no reload reqired
    }
    this.showDialog = false;
  }
  onEditCollection(collection: any) {
    console.log('Edit Collection, collection = ', collection);
    this.selectedCollection = collection;
    this.isNewCollection = false;
    this.showDialog = !this.showDialog;
  }
}
