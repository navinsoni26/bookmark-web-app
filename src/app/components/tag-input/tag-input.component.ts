import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {
  tagInputControl = new FormControl('');
  origTagsList: any = [];
  searchList: any[] = [];
  selectedTags: any[] = [];
  displaySearchList = false;
  searchListActiveItem: any;
  activeItemIndex = 0;
  textBox: HTMLElement | null;

  constructor(private service: TestService, private ref: ChangeDetectorRef) {
    this.textBox = document.getElementById('tag');
  }

  ngOnInit(): void {
    this.service.getTags().subscribe(res => {
      this.origTagsList = res;
      console.log(this.origTagsList[1].name);
    });
    this.tagInputControl.setErrors({ 'asd': 'asd' });
    this.tagInputControl.valueChanges.pipe(
      debounceTime(100),
      map(text => text.trim()),
      distinctUntilChanged()
    ).subscribe(
      (searchText: string) => {
        // if searchText is empty hide searchList else display it
        if (searchText) {
          console.log('Search Text = ', searchText);
          this.displaySearchList = true;
          this.searchList = this.origTagsList.filter((tag: any) => tag.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
          const exactSearch = this.searchList.filter((item: any) => item.name === searchText);
          if (exactSearch.length > 0) {
            // if exact search is found, then we don't add any item to searchList
            this.searchListActiveItem = exactSearch[0];
            this.activeItemIndex = 0;
          } else {
            this.searchList.unshift({ id: 0, name: searchText, count: 0 });
            this.searchListActiveItem = { id: 0, name: searchText, count: 0 };
            this.activeItemIndex = 0;
          }
        } else {
          this.displaySearchList = false;
        }
      }
    );
  }

  onItemSelection(item: any) {
    console.log('OnItemSelection = ', item);
    this.selectedTags.push(item);
      this.tagInputControl.setValue('');
      this.activeItemIndex = 0;
  }

  removeFromSelectedTags(index: number) {
    console.log('Remove fromSelectedTags, index = ', index);
    this.selectedTags.splice(index, 1);
  }

  submit(event: any) {
    console.log('Submit = ', event);
    event.preventDefault();
  }
  inputKeyupEvent(event: KeyboardEvent) {

    console.log('event.key = ', event);
    if (event.key === 'Enter') {
      this.selectedTags.push(this.searchList[this.activeItemIndex]);
      this.tagInputControl.setValue('');
      this.activeItemIndex = 0;
    }
    if (event.key === 'ArrowUp') {
      if (this.activeItemIndex === 0) {
        // this.activeItemIndex = this.searchList.length - 1;
      } else {
        this.activeItemIndex = this.activeItemIndex - 1;
      }
    }
    if (event.key === 'ArrowDown') {
      if (this.activeItemIndex === this.searchList.length - 1) {
        // this.activeItemIndex = 0;
      } else {
        this.activeItemIndex = this.activeItemIndex + 1;
      }
    }
    this.ref.detectChanges();
    const ulElement = document.getElementsByClassName('tag-list')[0] as HTMLElement;
    const liElement = document.getElementsByClassName('tag-list-item active')[0] as HTMLElement;

    // ulElement.scrollTop = liElement.offsetTop - ;
    // if(liElement.offsetTop > 90) {
    //   ulElement .scrollTop += 31;
    // }
    console.log('LI Element = ', liElement);
    console.log('LI Element OffsetTop = ', liElement.offsetTop);
    console.log('LI Element OffsetTop + Client Height = ', liElement.offsetTop + liElement.clientHeight);
    console.log('UI Element clientHeight = ', ulElement.clientHeight);
    console.log('LI Element clientTop = ', liElement.clientTop);
    const a = liElement.offsetTop + liElement.clientHeight;
    const b = ulElement.clientHeight;
    
      if(a > b) {
        ulElement.scrollTop = a - b;
      }
    
    

  }

}
