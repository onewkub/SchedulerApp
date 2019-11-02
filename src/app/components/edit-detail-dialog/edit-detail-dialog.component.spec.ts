import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailDIalogComponent } from './edit-detail-dialog.component';

describe('EditDetailDIalogComponent', () => {
  let component: EditDetailDIalogComponent;
  let fixture: ComponentFixture<EditDetailDIalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDetailDIalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailDIalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
