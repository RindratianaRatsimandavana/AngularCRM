import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentClDetailComponent } from './document-cl-detail.component';

describe('DocumentClDetailComponent', () => {
  let component: DocumentClDetailComponent;
  let fixture: ComponentFixture<DocumentClDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentClDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentClDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
