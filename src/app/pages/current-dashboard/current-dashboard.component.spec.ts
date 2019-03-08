import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDashboardComponent } from './current-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';

describe('CurrentDashboardComponent', () => {
  let component: CurrentDashboardComponent;
  let fixture: ComponentFixture<CurrentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, { metaReducers })],
      declarations: [CurrentDashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
