import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGaleryComponent } from './project-galery.component';

describe('ProjectGaleryComponent', () => {
  let component: ProjectGaleryComponent;
  let fixture: ComponentFixture<ProjectGaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGaleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
