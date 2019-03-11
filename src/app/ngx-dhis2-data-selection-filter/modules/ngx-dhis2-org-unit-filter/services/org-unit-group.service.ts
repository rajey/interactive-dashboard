import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { OrgUnitGroup } from '../models';
import { IndexDbService } from 'src/app/core';

@Injectable({ providedIn: 'root' })
export class OrgUnitGroupService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private indexDBService: IndexDbService
  ) {}

  loadFromServer() {
    return this.httpClient
      .get(`organisationUnitGroups.json?fields=id,name&paging=false`)
      .pipe(map((res: any) => res.organisationUnitGroups || []));
  }

  loadAll(): Observable<OrgUnitGroup[]> {
    return this.indexDBService.getAll('organisationUnitGroups').pipe(
      catchError(() => of([])),
      switchMap((orgUnitGroups: OrgUnitGroup[]) =>
        orgUnitGroups.length > 0
          ? of(orgUnitGroups)
          : this.loadFromServer().pipe(
              tap((orgUnitGroupsFromServer: OrgUnitGroup[]) => {
                this.indexDBService
                  .saveBulk('organisationUnitGroups', orgUnitGroupsFromServer)
                  .subscribe(() => {});
              })
            )
      )
    );
  }
}
