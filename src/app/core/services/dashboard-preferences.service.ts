import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardPreferencesService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getPreferences() {
    return this._getPreferencesFromFile().pipe(
      switchMap((preferences: any) => {
        const dataStoreUrl = `dataStore/dashboard-preferences/${
          preferences ? preferences.namespace : 'default'
        }`;
        return this.httpClient.get(dataStoreUrl).pipe(
          catchError((error: any) => {
            if (error.status !== 404) {
              return throwError(error);
            }

            return this.createPreferences(
              dataStoreUrl,
              preferences || { namespace: 'default' }
            );
          })
        );
      })
    );
  }

  createPreferences(dataStoreUrl, data) {
    return this.httpClient.post(dataStoreUrl, data).pipe(map(() => data));
  }

  private _getPreferencesFromFile() {
    return this.httpClient
      .get('preferences.json', {
        isExternalLink: true
      })
      .pipe(catchError(() => of(null)));
  }
}
