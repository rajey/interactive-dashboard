import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationComponent implements OnInit {
  @Input()
  visualizationLayers: any[];

  @Input()
  visualizationId: string;

  @Input()
  visualizationType: string;

  @Input()
  visualizationHeight: string;
  constructor() {}

  ngOnInit() {}
}
