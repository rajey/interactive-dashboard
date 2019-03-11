import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { NgxDhis2ChartModule } from './modules/ngx-dhis-chart/ngx-dhis2-chart.module';
import { NgxDhis2TableModule } from './modules/ngx-dhis2-table/ngx-dhis2-table.module';

@NgModule({
  declarations: [...components],
  exports: [...components, NgxDhis2ChartModule, NgxDhis2TableModule],
  imports: [CommonModule, NgxDhis2ChartModule, NgxDhis2TableModule]
})
export class VisualizationModule {}
