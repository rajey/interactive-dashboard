import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RoutingModule } from './app.routes';
import { components } from './components';
import { CoreModule, RouteSerializer } from './core';
import { pages } from './pages';
import { effects } from './store/effects';
import { metaReducers, reducers } from './store/reducers';
import { containers } from './containers';
import { AnalyticsModule } from './analytics/analytics.module';
import { VisualizationModule } from './visualization/visualization.module';
import { NgxDhis2SelectionFiltersModule } from './ngx-dhis2-data-selection-filter/ngx-dhis2-selection-filters.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, ...pages, ...components, ...containers],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    CoreModule.forRoot({
      namespace: 'hisptz',
      version: 1,
      models: {
        users: 'id',
        organisationUnitLevels: 'id',
        organisationUnits: 'id',
        organisationUnitGroups: 'id'
      }
    }),

    AnalyticsModule,
    VisualizationModule,
    NgxDhis2SelectionFiltersModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    /**
     * Menu  module
     */
    NgxDhis2MenuModule,

    /**
     * Translation module
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule,

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
