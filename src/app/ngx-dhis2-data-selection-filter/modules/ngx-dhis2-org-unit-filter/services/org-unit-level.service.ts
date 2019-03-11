import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { OrgUnitLevel } from '../models';
import { IndexDbService } from 'src/app/core';

@Injectable({ providedIn: 'root' })
export class OrgUnitLevelService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private indexDBService: IndexDbService
  ) {}

  loadFromServer() {
    return this.httpClient
      .get(
        `organisationUnitLevels.json?fields=id,name,level&paging=false&order=level:asc`
      )
      .pipe(map((res: any) => res.organisationUnitLevels || []));
  }

  loadAll(): Observable<OrgUnitLevel[]> {
    return this.indexDBService.getAll('organisationUnitLevels').pipe(
      catchError(() => of([])),
      switchMap((orgUnitLevels: OrgUnitLevel[]) =>
        orgUnitLevels.length > 0
          ? of(orgUnitLevels)
          : this.loadFromServer().pipe(
              tap((orgUnitLevelsFromServer: OrgUnitLevel[]) => {
                this.indexDBService
                  .saveBulk('organisationUnitLevels', orgUnitLevelsFromServer)
                  .subscribe(() => {});
              })
            )
      )
    );
  }
}
