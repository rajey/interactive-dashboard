import * as _ from 'lodash';
import { Dashboard, User } from '../models';
import { getStandardizedDashboard } from './get-standardized-dashboard.helper';

export function getStandardizedDashboards(
  dashboards: any[],
  currentUser: User
): Dashboard[] {
  return (dashboards || []).map(dashboard =>
    getStandardizedDashboard(dashboard, currentUser)
  );
}
