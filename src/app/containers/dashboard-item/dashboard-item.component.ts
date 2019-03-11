import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { State } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { DashboardItem } from 'src/app/core';
import * as _ from 'lodash';
import { getVisualizationLayersFromFavorite } from 'src/app/store/selectors/favorite.selectors';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardItemComponent implements OnInit {
  @Input()
  dashboardItem: DashboardItem;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    if (this.dashboardItem) {
      console.log(this.dashboardItem);
    }
  }
}
