import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  @Input() collections: Collection[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
