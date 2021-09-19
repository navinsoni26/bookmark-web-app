import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageType } from 'src/app/models/message.data';
import { CollectionService } from 'src/app/services/collection.service';
import { MessageService } from 'src/app/services/message.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent implements OnInit {

  @Input() collection: any;
  @Input() isNewCollection = true;
  collections: any[] = [{ id: 0, name: 'Please select a parent...' }];
  showList = false;
  selectedCollection?: any;
  nestUnderCollection = false;
  collectionForm: FormGroup;

  @Output() closeForm = new EventEmitter();
  constructor(
    private service: TestService,
    private collectionService: CollectionService,
    private messageService: MessageService
    ) {
    this.collectionForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    console.log('isNewCollection = ', this.isNewCollection);
    console.log('collection = ', this.collection);
    this.selectedCollection = this.collections[0];
    this.collectionService.collectionSubject.subscribe(
      (res: any) => {
        console.log('Response from subject = ', res);
        const obj = res.map((item: any) => ({ id: item.id, name: item.name }));
        this.collections = [...this.collections, ...obj];
        console.log(this.collections);
        if(!this.isNewCollection) {
          this.collectionForm.get('name')?.setValue(this.collection.name);
          if(this.collection.parentId === null) {
            this.nestUnderCollection = false;
          } else {
            this.nestUnderCollection = true;
            this.selectedCollection = this.collections.filter(item => item.id === this.collection.parentId)[0];
          }
        }
      }
    );
  }

  onCheckboxChanged() {
    this.nestUnderCollection = !this.nestUnderCollection;
    if (this.nestUnderCollection) {
      // enabled
    } else {
      // disabled
      this.showList = false;
      this.selectedCollection = this.collections[0];
    }
  }

  onToggleDropdown() {
    this.showList = !this.showList;
  }

  onItemSelected(item: any) {
    this.selectedCollection = item;
    this.showList = !this.showList;
    if (item.id !== 0) {
      this.nestUnderCollection = true;
    }
  }

  submit() {
    if (this.isNewCollection) {
      const requestBody = {
        'name': this.collectionForm.value.name,
        'count': 0,
        'hidden': 0,
        'parentId': this.selectedCollection.id !== 0 ? this.selectedCollection.id : null
      };
      this.collectionService.createCollection(requestBody).subscribe(
        res => {
          console.log('Response = ', res);
          this.messageService.successMessage('Collection created successfully');
          this.onCloseForm(true);

        },
        err => {
          console.log('Error = ', err);
          this.messageService.errorMessage('Failed to create new collection');
          this.onCloseForm(false);
          
        }
      )
    } else {
      const requestBody = {
        id: this.collection.id,
        name: this.collectionForm.value.name,
        count: this.collection.count,
        hidden: this.collection.hidden,
        parentId: this.selectedCollection.id !== 0 ? this.selectedCollection.id : null
      }
      this.service.putCollection(requestBody).subscribe(
        res => {
          console.log('Response = ', res);
          this.onCloseForm(true);
        },
        err => {
          console.log('Error = ', err);
        }
      )
    }
  }

  onCloseForm(reloadRequired: boolean) {
    this.closeForm.emit(reloadRequired);
  }

}
