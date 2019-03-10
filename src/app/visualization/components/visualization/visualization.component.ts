import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  @Input()
  visualizationLayers: any[];

  @Input()
  visualizationId: string;

  @Input()
  visualizationType: string;
  constructor() {}

  ngOnInit() {}
}
