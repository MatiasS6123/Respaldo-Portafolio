import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaNotasProfesorComponent } from './lista-notas-profesor.component';

describe('ListaNotasProfesorComponent', () => {
  let component: ListaNotasProfesorComponent;
  let fixture: ComponentFixture<ListaNotasProfesorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNotasProfesorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaNotasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
