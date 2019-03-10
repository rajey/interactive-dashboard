import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationBodyComponent } from './visualization-body.component';

describe('VisualizationBodyComponent', () => {
  let component: VisualizationBodyComponent;
  let fixture: ComponentFixture<VisualizationBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
