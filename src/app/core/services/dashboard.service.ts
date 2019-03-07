import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { DashboardPreferences } from '../models';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getDashboards(dashboardPreferences: DashboardPreferences) {
    return dashboardPreferences && dashboardPreferences.useDataStoreAsSource
      ? this._getDashboardsFromDataStore(dashboardPreferences)
      : this._getDashboardsFromApi();
  }

  private _getDashboardsFromApi() {
    return this.httpClient
      .get(
        'dashboards.json?fields=id,name,user[id,name],description,access,' +
          'created,lastUpdated,favorite,dashboardItems[id,type],favorites&paging=false'
      )
      .pipe(
        map((dashboardResponse: any) => dashboardResponse.dashboards || [])
      );
  }

  private _getDashboardsFromDataStore(
    dashboardPreferences: DashboardPreferences
  ) {
    return this.httpClient.get('dataStore/dashboards').pipe(
      mergeMap((dashboardIds: Array<string>) => {
        const filteredDashboardIds = dashboardIds.filter(
          (dashboardId: string) => {
            const splitedDashboardId = dashboardId.split('_');
            const dashboardNamespace = splitedDashboardId[0] || '';
            return dashboardNamespace === dashboardPreferences.namespace;
          }
        );

        if (filteredDashboardIds.length === 0) {
          return of([]);
        }
        return forkJoin(
          filteredDashboardIds.map(dashboardId => {
            return this.httpClient.get(`dataStore/dashboards/${dashboardId}`);
          })
        );
      }),
      catchError(() => of([]))
    );
  }
}
