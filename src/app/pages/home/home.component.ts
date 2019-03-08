import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { DashboardMenuItem, Dashboard } from 'src/app/core';
import {
  getDashboardMenuList,
  getDashboardById
} from 'src/app/store/selectors';
import { SetCurrentDashboardAction } from 'src/app/store/actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  dashboardMenuList$: Observable<DashboardMenuItem[]>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.dashboardMenuList$ = this.store.select(getDashboardMenuList);
  }

  onSetCurrenDashboardAction(dashboardId: string) {
    this.store
      .select(getDashboardById(dashboardId))
      .pipe(take(1))
      .subscribe((dashboard: Dashboard) => {
        if (dashboard) {
          this.store.dispatch(new SetCurrentDashboardAction(dashboard));
        }
      });
  }
}
