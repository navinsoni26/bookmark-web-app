import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListDialogComponent } from './collection-list-dialog.component';

describe('CollectionListDialogComponent', () => {
  let component: CollectionListDialogComponent;
  let fixture: ComponentFixture<CollectionListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
