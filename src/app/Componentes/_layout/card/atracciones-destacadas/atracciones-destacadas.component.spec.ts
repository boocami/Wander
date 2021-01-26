import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtraccionesDestacadasComponent } from './atracciones-destacadas.component';

describe('AtraccionesDestacadasComponent', () => {
  let component: AtraccionesDestacadasComponent;
  let fixture: ComponentFixture<AtraccionesDestacadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtraccionesDestacadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtraccionesDestacadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
