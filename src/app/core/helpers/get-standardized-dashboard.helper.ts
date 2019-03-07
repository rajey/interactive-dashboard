import { User, Dashboard } from '../models';
import { getDashboardBookmarkStatus } from './get-dashboard-bookmark-status.helper';
import { getDashboardAccess } from './get-dashboard-access.helper';

export function getStandardizedDashboard(
  dashboard: any,
  currentUser: User
): Dashboard {
  return dashboard
    ? {
        ...dashboard,
        favorite: dashboard.hasOwnProperty('favorite')
          ? dashboard.favorite
          : getDashboardBookmarkStatus(
              dashboard.favorites || dashboard.bookmarks,
              currentUser ? currentUser.id : ''
            ),
        access: dashboard.access || getDashboardAccess(dashboard, currentUser)
      }
    : null;
}
