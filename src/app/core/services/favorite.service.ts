import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { DashboardPreferences } from '../models';
import { getFavoriteUrl } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _favoriteDataStoreNamespace: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this._favoriteDataStoreNamespace = 'favorite';
  }

  get(
    favoriteId: string,
    favoriteType: string,
    dashboardPreferences: DashboardPreferences
  ) {
    const favoriteUrl = getFavoriteUrl({ id: favoriteId, type: favoriteType });
    return favoriteUrl !== ''
      ? dashboardPreferences.useDataStoreAsSource
        ? this.http.get(
            `dataStore/${this._favoriteDataStoreNamespace}/${favoriteId}`
          )
        : this.http.get(favoriteUrl)
      : of(null);
  }
}
