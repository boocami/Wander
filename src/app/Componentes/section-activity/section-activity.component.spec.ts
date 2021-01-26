import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionActivityComponent } from './section-activity.component';

describe('SectionActivityComponent', () => {
  let component: SectionActivityComponent;
  let fixture: ComponentFixture<SectionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
