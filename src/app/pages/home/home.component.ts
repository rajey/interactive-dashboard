import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { DashboardMenuItem } from 'src/app/core';
import { getDashboardMenuList } from 'src/app/store/selectors';

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
}
