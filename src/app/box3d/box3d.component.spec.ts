import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Box3dComponent } from './box3d.component';

describe('Box3dComponent', () => {
  let component: Box3dComponent;
  let fixture: ComponentFixture<Box3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Box3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Box3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
