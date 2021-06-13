import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {
  tagInputControl = new FormControl('');
  origTagsList: any = [];
  searchList: any = [];
  selectedTags: any = [];
  displaySearchList = false;
  searchListActiveItem: any;
  activeItemIndex = 0;
  textBox: HTMLElement | null;

  constructor(private service: TestService) {
    this.textBox = document.getElementById('tag');
   }

  ngOnInit(): void {
    this.service.getTags().subscribe(res => {
      this.origTagsList = res;
      console.log(this.origTagsList[1].name);
    });
    this.tagInputControl.setErrors({'asd': 'asd'});
    this.tagInputControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(
      searchText => {
        // if searchText is empty hide searchList else display it
        if(searchText) {
          this.displaySearchList = true;
          this.searchList = this.origTagsList.filter((tag: any) => tag.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
          const exactSearch = this.searchList.filter((item: any) => item.name === searchText);
          if(exactSearch.length > 0) {
            this.searchListActiveItem = exactSearch[0];
            this.activeItemIndex = 0;
          } else {
            this.searchList.push({id: 0, name: searchText + ' (Create New)', count: 0});
            this.searchListActiveItem = {id: 0, name: searchText + ' (Create New)', count: 0};
            this.activeItemIndex = this.searchList.length - 1;
          }
        } else {
          this.displaySearchList = false;
        }
      }
    );
  }

  submit(event: any){
    console.log('Submit = ', event);
    event.preventDefault();
  }
  inputKeyupEvent(event: KeyboardEvent) {
    
    console.log('event.key = ', event);
    if(event.key === 'Enter') {
      this.selectedTags.push(this.searchList[this.activeItemIndex]);
      this.tagInputControl.setValue('');
      this.activeItemIndex = 0;
    }
    if(event.key === 'ArrowUp') {
      if (this.activeItemIndex === 0) {
        this.activeItemIndex = this.searchList.length - 1;
      } else {
        this.activeItemIndex = this.activeItemIndex - 1;
      }
    }
    if(event.key === 'ArrowDown') {
      if (this.activeItemIndex === this.searchList.length - 1) {
        this.activeItemIndex = 0;
      } else {
        this.activeItemIndex = this.activeItemIndex + 1;
      }
    }
  }

}
