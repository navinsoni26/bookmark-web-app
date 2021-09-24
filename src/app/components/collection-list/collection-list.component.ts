import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Collection } from 'src/app/models/collection';
import { CollectionAction } from 'src/app/models/constants';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  list: any[] = [];
  origCollectionList: any[] = [];
  expandCollapseArray: boolean[] = [];
  searchCollectionInput: FormControl;
  mapOfChildren = new Map();
  eCollectionAction = CollectionAction;

  constructor(
    private collectionService: CollectionService
  ) {
    this.searchCollectionInput = new FormControl('');
    this.searchCollectionInput.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(
      text => {
        this.list = this.origCollectionList.filter(item => {
          item.children = this.mapOfChildren.get(item.id); // mapOfChildren has children from origCollectionList
          if (item.children.length > 0) {
            // search for text in children also
            item.children = item.children.filter((child: any) => (child.name.toLowerCase().indexOf(text.toLowerCase()) > -1 || child.count == text))
          }
          return item.children.length > 0 || item.name.toLowerCase().indexOf(text.toLowerCase()) > -1 || item.count == text;
        });
      }
    );
  }

  ngOnInit(): void {
    this.collectionService.collectionSubject.subscribe(
      res => {
        this.list = res;
        this.list.forEach(collection => {
          this.expandCollapseArray.push(true);
          this.mapOfChildren.set(collection.id, collection.children);

        });
        this.origCollectionList = [...this.list];
      }
    )

  }

  onParentSwitchChange(collection: Collection) {
    collection.show = !collection.show;
    console.log('Parent switch change = ', collection);
    if (!collection.show) {
      // disbale all children show 
      collection.children.forEach(child => child.show = false);
    }
  }

  onChildSwitchChange(childCollection: Collection) {
    childCollection.show = !childCollection.show;
  }

  onAction(action: CollectionAction, selectedCollection: any) {
    console.log('Selected Collection =', selectedCollection);
    switch(action) {
      case CollectionAction.Edit:
        console.log('Edit Collection');
        break;
      case CollectionAction.Delete:
        console.log('Delete collection');
        break;
      case CollectionAction.Share:
        console.log('Share Collection');
        break;
      default:
        console.log('Default case');
    }
  }

}
