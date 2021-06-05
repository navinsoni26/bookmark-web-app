import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ContextMenuItem } from 'src/app/models/context-menu-items';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  @Input() menuItems: ContextMenuItem[] = [];
  @Output() onMenuItemClicked = new EventEmitter();
  x = 0;
  y = 0;
  show: boolean = false;
  documentClick$ ?: Subscription;
  constructor() { 
    this.documentClick$ = fromEvent(document, 'click').subscribe(
      data => {
        console.log('Click on Document');
        if(this.show) {
          this.show = false;
        }
      }
    );
  }

  ngOnInit(): void {
    console.log('Context Menu Oninit called');
  }

  ngOnDestroy() {
    console.log('Context Menu destroy called');
    this.documentClick$?.unsubscribe();
  }

  showContextMenu( event:any, x: any, y: any) {
    console.log('Show Context Menu');
    this.show = !this.show;
    this.x = x;
    this.y = y;
    event.stopPropagation();
  }

  onItemClick(item: ContextMenuItem) {
    this.show = false;
    this.onMenuItemClicked.emit(item.action);
  }

}
