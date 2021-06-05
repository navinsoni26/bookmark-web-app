import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Collection } from 'src/app/models/collection';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-collection-list-dialog',
  templateUrl: './collection-list-dialog.component.html',
  styleUrls: ['./collection-list-dialog.component.scss']
})
export class CollectionListDialogComponent implements OnInit {

  @Input() collections: Collection[] = [];
  list: {id: string, name: string}[] = [];
  origList: {id: string, name: string}[] = [];
  searchInput: FormControl;
  displayCreateNew: boolean = true;
  constructor() { 
    this.searchInput = new FormControl('');
    this.searchInput.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(
      text => {
        this.list = this.origList.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
        if(this.list.filter(item => item.name.toLowerCase() === text.toLowerCase()).length > 0) {
          this.displayCreateNew = false;
        } else {
          this.displayCreateNew = true;
        }
      }
    );
  }

  ngOnInit(): void {
    this.collections.forEach(collection => {
      this.list.push({id: collection.id, name: collection.name});
      if(collection.children.length > 0) {
        collection.children.forEach(child => {
          this.list.push({id: child.id, name: collection.name + '/' + child.name});
        })
      }
    });
    console.log('List = ', this.list);
    this.origList = [...this.list];
  }

}
