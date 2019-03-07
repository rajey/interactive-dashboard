import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DashboardItemService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getDashboardItem(dashboardItemId: string, dashboardItemType: string) {
    return this.http.get(
      `dashboardItems/${dashboardItemId}.json?fields=id,type,height,width,x,y,interpretationCount,favorite,access,${_.camelCase(
        dashboardItemType
      )}[id,name]`
    );
  }
}
