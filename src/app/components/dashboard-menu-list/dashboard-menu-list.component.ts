import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
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

  constructor() {}

  ngOnInit() {}
}
