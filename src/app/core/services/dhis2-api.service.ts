import { Injectable } from '@angular/core';
import { init, getInstance } from 'd2';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Dhis2ApiService {
  constructor() {}

  async initialize() {
    init();
  }

  getD2Instance() {
    return getInstance();
  }

  addToDataStore(namespace: string, key: string, data: any) {
    return new Observable(observer => {
      getInstance()
        .get(namespace)
        .then(
          (dataStoreNamespace: any) => {
            dataStoreNamespace.set(key, data).then(
              dataStoreObject => {
                observer.next(dataStoreObject);
                observer.complete();
              },
              keyError => {
                observer.error(keyError);
              }
            );
          },
          namespaceError => {
            observer.error(namespaceError);
          }
        );
    });
  }

  getOneFromDataStore(namespace: string, key: string): Observable<any> {
    return new Observable(observer => {
      getInstance().then(d2 => {
        d2.dataStore.get(namespace).then(
          (dataStoreNamespace: any) => {
            dataStoreNamespace.get(key).then(
              dataStoreObject => {
                observer.next(dataStoreObject);
                observer.complete();
              },
              keyError => {
                observer.error(keyError);
              }
            );
          },
          namespaceError => {
            observer.error(namespaceError);
          }
        );
      });
    });
  }
}
