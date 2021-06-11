import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlySharedComponent } from './recently-shared.component';

describe('RecentlySharedComponent', () => {
  let component: RecentlySharedComponent;
  let fixture: ComponentFixture<RecentlySharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlySharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlySharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
