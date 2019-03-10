import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationComponent } from './visualization.component';
import { VisualizationBodyComponent } from '../visualization-body/visualization-body.component';

describe('VisualizationComponent', () => {
  let component: VisualizationComponent;
  let fixture: ComponentFixture<VisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationComponent, VisualizationBodyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
