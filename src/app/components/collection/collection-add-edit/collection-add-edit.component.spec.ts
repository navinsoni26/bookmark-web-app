import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAddEditComponent } from './collection-add-edit.component';

describe('CollectionAddEditComponent', () => {
  let component: CollectionAddEditComponent;
  let fixture: ComponentFixture<CollectionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
