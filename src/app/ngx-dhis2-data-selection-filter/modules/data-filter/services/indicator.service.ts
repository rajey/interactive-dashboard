import { Injectable } from '@angular/core';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { of } from 'rxjs';
import { Indicator } from '../model/indicator';
import { IndexDbService } from 'src/app/core';

@Injectable({ providedIn: 'root' })
export class IndicatorService {
  constructor(
    private http: NgxDhis2HttpClientService,
    private indexDBService: IndexDbService
  ) {}

  loadAll() {
    return this.indexDBService.getAll('indicators').pipe(
      catchError(() => of([])),
      switchMap((indicators: Indicator[]) =>
        indicators.length > 0
          ? of(indicators)
          : this._loadFromApi().pipe(
              tap((indicatorsFromServer: Indicator[]) => {
                this.indexDBService
                  .saveBulk('indicators', indicatorsFromServer)
                  .subscribe(() => {});
              })
            )
      )
    );
  }

  private _loadFromApi() {
    return this.http
      .get('indicators.json?fields=id,name,code&paging=false')
      .pipe(map(res => res.indicators || []));
  }
}
