import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectClDetailComponent } from './project-cl-detail.component';

describe('ProjectClDetailComponent', () => {
  let component: ProjectClDetailComponent;
  let fixture: ComponentFixture<ProjectClDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectClDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectClDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
