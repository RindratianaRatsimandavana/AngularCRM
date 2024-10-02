import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentClListComponent } from './document-cl-list.component';

describe('DocumentClListComponent', () => {
  let component: DocumentClListComponent;
  let fixture: ComponentFixture<DocumentClListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentClListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentClListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
