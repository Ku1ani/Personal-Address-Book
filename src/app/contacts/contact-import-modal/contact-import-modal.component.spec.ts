import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactImportModalComponent } from './contact-import-modal.component';

describe('ContactImportModalComponent', () => {
  let component: ContactImportModalComponent;
  let fixture: ComponentFixture<ContactImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactImportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
