import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaNotasApoderadoComponent } from './lista-notas-apoderado.component';

describe('ListaNotasApoderadoComponent', () => {
  let component: ListaNotasApoderadoComponent;
  let fixture: ComponentFixture<ListaNotasApoderadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNotasApoderadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaNotasApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
