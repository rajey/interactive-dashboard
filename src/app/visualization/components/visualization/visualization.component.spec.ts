import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationComponent } from './visualization.component';
import { VisualizationBodyComponent } from '../visualization-body/visualization-body.component';
import { NgxDhis2ChartModule } from '../../modules/ngx-dhis-chart/ngx-dhis2-chart.module';
import { NgxDhis2TableModule } from '../../modules/ngx-dhis2-table/ngx-dhis2-table.module';

describe('VisualizationComponent', () => {
  let component: VisualizationComponent;
  let fixture: ComponentFixture<VisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxDhis2ChartModule, NgxDhis2TableModule],
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
