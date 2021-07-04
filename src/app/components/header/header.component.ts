import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDialog = false;
  constructor() { }

  ngOnInit(): void {
  }

  addBookmark() {
    this.showDialog = !this.showDialog;
  }

  onCloseDialog(value: any) {
    if(value) {
      // reload required
    } else {
      // no reload reqired
    }
    this.showDialog = false;
  }
}
