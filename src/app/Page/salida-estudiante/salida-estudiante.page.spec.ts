import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalidaEstudiantePage } from './salida-estudiante.page';

describe('SalidaEstudiantePage', () => {
  let component: SalidaEstudiantePage;
  let fixture: ComponentFixture<SalidaEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
