import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-delete',
  templateUrl: './collection-delete.component.html',
  styleUrls: ['./collection-delete.component.scss']
})
export class CollectionDeleteComponent implements OnInit {

  @Input() collectionToDelete: any;
  constructor() { }

  ngOnInit(): void {
  }

  onCloseDialog(event: any) {

  }

  // deleteCollection()
}
