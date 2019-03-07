import * as _ from 'lodash';
export function getDashboardItemsFromDashboards(dashboards: any[]) {
  return _.flatten(
    _.map(dashboards || [], (dashboard: any) => dashboard.dashboardItems || [])
  );
}
