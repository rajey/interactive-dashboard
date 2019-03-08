import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { Dashboard } from 'src/app/core';
import { getCurrentDashboard } from 'src/app/store/selectors';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$: Observable<Dashboard>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.currentDashboard$ = this.store.select(getCurrentDashboard);
  }
}
