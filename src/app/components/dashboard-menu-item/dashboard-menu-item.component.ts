import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { DashboardMenuItem } from 'src/app/core';

@Component({
  selector: 'app-dashboard-menu-item',
  templateUrl: './dashboard-menu-item.component.html',
  styleUrls: ['./dashboard-menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMenuItemComponent implements OnInit {
  @Input()
  dashboardMenuItem: DashboardMenuItem;

  @Output()
  setDashboard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onSetDashboard(e, dashboardMenuItem: DashboardMenuItem) {
    e.stopPropagation();
    if (dashboardMenuItem) {
      this.setDashboard.emit(dashboardMenuItem.id);
    }
  }
}
