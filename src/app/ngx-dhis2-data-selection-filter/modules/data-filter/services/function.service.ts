import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { forkJoin, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { IndexDbService } from 'src/app/core';

import { FunctionObject } from '../models';

@Injectable({ providedIn: 'root' })
export class FunctionService {
  private _dataStoreUrl: string;
  constructor(
    private http: NgxDhis2HttpClientService,
    private indexDBService: IndexDbService
  ) {
    this._dataStoreUrl = 'dataStore/functions';
  }

  private _loadFromServer() {
    return this.http.get(this._dataStoreUrl).pipe(
      mergeMap((functionIds: Array<string>) =>
        forkJoin(
          _.map(functionIds, (functionId: string) => this.load(functionId))
        ).pipe(catchError(() => of([])))
      ),
      catchError(() => of([]))
    );
  }

  loadAll() {
    return this.indexDBService.getAll('functions').pipe(
      catchError(() => of([])),
      switchMap((functions: FunctionObject[]) =>
        functions.length > 0
          ? of(functions)
          : this._loadFromServer().pipe(
              tap((functionsFromServer: FunctionObject[]) => {
                this.indexDBService
                  .saveBulk('functions', functionsFromServer)
                  .subscribe(() => {});
              })
            )
      )
    );
  }

  load(id: string) {
    return this.http.get(`${this._dataStoreUrl}/${id}`);
  }
}
