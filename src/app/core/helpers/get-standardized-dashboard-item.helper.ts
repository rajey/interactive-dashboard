import { DashboardItem } from '../models';
import { getDashboardItemGridColumn } from './get-dashboard-item-grid-column.helper';
import { getStandardizedVisualizationType } from './get-standardized-visualization-type.helper';

export function getStandardizedDashboardItem(
  dashboardItem: any
): DashboardItem {
  return dashboardItem
    ? {
        ...dashboardItem,
        gridColumn: getDashboardItemGridColumn(dashboardItem),
        currentType: getStandardizedVisualizationType(dashboardItem.type),
        height:
          dashboardItem.height && dashboardItem.height > 200
            ? `${dashboardItem.height}px`
            : '450px'
      }
    : null;
}
