import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDeleteComponent } from './collection-delete.component';

describe('CollectionDeleteComponent', () => {
  let component: CollectionDeleteComponent;
  let fixture: ComponentFixture<CollectionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
