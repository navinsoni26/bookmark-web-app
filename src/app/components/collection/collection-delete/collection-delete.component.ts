import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-delete',
  templateUrl: './collection-delete.component.html',
  styleUrls: ['./collection-delete.component.scss']
})
export class CollectionDeleteComponent implements OnInit {

  @Input() collectionToDelete: any;
  @Output() onDeleteDialogClosed = new EventEmitter();
  constructor(
    private collectionService: CollectionService
  ) { }

  ngOnInit(): void {
  }


  // deleteCollection()
  closeDeleteDialog(reloadRequired: boolean) {
    this.onDeleteDialogClosed.emit(reloadRequired);
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collectionToDelete.id).subscribe(
      res => {
        console.log('Delete successful -> ', res);
        this.closeDeleteDialog(true);
      }
    )
  }
}
