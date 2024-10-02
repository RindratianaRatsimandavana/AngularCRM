import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectClListComponent } from './project-cl-list.component';

describe('ProjectClListComponent', () => {
  let component: ProjectClListComponent;
  let fixture: ComponentFixture<ProjectClListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectClListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectClListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
