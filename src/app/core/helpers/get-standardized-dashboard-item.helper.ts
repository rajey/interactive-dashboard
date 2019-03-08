import { DashboardItem } from '../models';
import { getDashboardItemGridColumn } from './get-dashboard-item-grid-column.helper';

export function getStandardizedDashboardItem(
  dashboardItem: any
): DashboardItem {
  return {
    ...dashboardItem,
    gridColumn: getDashboardItemGridColumn(dashboardItem),
    height: dashboardItem.height ? `${dashboardItem.height}px` : '450px'
  };
}
