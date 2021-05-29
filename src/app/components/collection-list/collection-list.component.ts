import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  @Input() collections: Collection[] = [];
  expandCollapseArray: boolean[] = [];
  constructor() { }

  ngOnInit(): void {
    this.collections.forEach(collection => {
      this.expandCollapseArray.push(true);
    });
  }

  onParentSwitchChange(collection: Collection) {
    collection.show = !collection.show;
    console.log('Parent switch change = ', collection);
    if(!collection.show) {
      // disbale all children show 
      collection.children.forEach(child => child.show = false);
    }
  }

  onChildSwitchChange(childCollection: Collection) {
    childCollection.show = !childCollection.show;
  }


}
