import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List3dboxesComponent } from './list3dboxes.component';

describe('List3dboxesComponent', () => {
  let component: List3dboxesComponent;
  let fixture: ComponentFixture<List3dboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List3dboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List3dboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
