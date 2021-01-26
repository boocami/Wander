import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSignupComponent } from './content-signup.component';

describe('ContentSignupComponent', () => {
  let component: ContentSignupComponent;
  let fixture: ComponentFixture<ContentSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
