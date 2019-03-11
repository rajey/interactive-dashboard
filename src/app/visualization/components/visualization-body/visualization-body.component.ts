import { Component, OnInit, Input } from '@angular/core';
import { VisualizationLayer } from 'src/app/core/models/visualization-layer.model';

@Component({
  selector: 'app-visualization-body',
  templateUrl: './visualization-body.component.html',
  styleUrls: ['./visualization-body.component.css']
})
export class VisualizationBodyComponent implements OnInit {
  @Input()
  visualizationLayers: VisualizationLayer[];
  @Input()
  visualizationHeight: string;

  @Input()
  visualizationId: string;

  @Input()
  visualizationType: string;
  constructor() {}

  ngOnInit() {}
}
