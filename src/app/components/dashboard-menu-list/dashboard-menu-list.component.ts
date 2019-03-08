import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { DashboardMenuItem } from 'src/app/core';

@Component({
  selector: 'app-dashboard-menu-list',
  templateUrl: './dashboard-menu-list.component.html',
  styleUrls: ['./dashboard-menu-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMenuListComponent implements OnInit {
  @Input()
  dashboardMenuList: DashboardMenuItem[];

  @Output()
  setCurrentDashboard: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(dashboardId: string) {
    this.setCurrentDashboard.emit(dashboardId);
  }
}
