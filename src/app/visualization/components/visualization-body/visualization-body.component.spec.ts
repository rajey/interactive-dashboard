import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationBodyComponent } from './visualization-body.component';
import { NgxDhis2TableModule } from '../../modules/ngx-dhis2-table/ngx-dhis2-table.module';
import { NgxDhis2ChartModule } from '../../modules/ngx-dhis-chart/ngx-dhis2-chart.module';

describe('VisualizationBodyComponent', () => {
  let component: VisualizationBodyComponent;
  let fixture: ComponentFixture<VisualizationBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxDhis2TableModule, NgxDhis2ChartModule],
      declarations: [VisualizationBodyComponent]
    }).compileComponents();
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
