import { Component, OnInit, Input } from '@angular/core';
import { DashboardMenuItem } from 'src/app/core';

@Component({
  selector: 'app-dashboard-menu-item',
  templateUrl: './dashboard-menu-item.component.html',
  styleUrls: ['./dashboard-menu-item.component.css']
})
export class DashboardMenuItemComponent implements OnInit {
  @Input()
  dashboardMenuItem: DashboardMenuItem;
  constructor() {}

  ngOnInit() {}
}
