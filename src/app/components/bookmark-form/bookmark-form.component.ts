import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { TagInputComponent } from '../tag-input/tag-input.component';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})
export class BookmarkFormComponent implements OnInit {
  collections: any = [];
  bookmarkForm: FormGroup;

  @ViewChild('tagInput') TagInputComponent?: TagInputComponent;
  constructor(private fb: FormBuilder, private service: TestService) {
    this.bookmarkForm = this.fb.group({
      id: '',
      title: '',
      url: '',
      notes: '',
      collectionId: '',
      isFav: false,
      iconUrl : '',
    })
   }

  ngOnInit(): void {
    this.service.getCollections().subscribe(
      (res: any) => {
        res.forEach((item: any) => {
          this.collections.push({
            id: item.id,
            name: item.name
          });
          if(item.children.length > 0) {
            item.children.forEach((child: any) => {
              this.collections.push({
                id: child.id,
                name: item.name + ' / ' + child.name
              });
            })
          } 
        });
      }
    );
  }

  onSubmit() {
    console.log('Form Value = ', this.bookmarkForm.value);
    console.log('Selected tags = ', this.TagInputComponent?.selectedTags);
    const selectedTags = this.TagInputComponent?.selectedTags;
    selectedTags?.forEach((tag: any) => delete tag.count);
    const requestBody = {...this.bookmarkForm.value, tags: selectedTags};
    console.log('RequestBody = ', requestBody);
    this.service.postBookmark(requestBody).subscribe(
      (res: any) => {
        console.log('Response = ', res);
      }
    )
  }

}
