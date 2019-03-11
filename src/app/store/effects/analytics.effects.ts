import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { AnalyticsService } from 'src/app/analytics/services';
import { Observable, forkJoin, of } from 'rxjs';
import {
  AnalyticsActionTypes,
  LoadAnalyticsAction,
  LoadAnalyticsSuccessAction,
  LoadAnalyticsFailAction
} from '../actions/analytics.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { VisualizationLayer } from 'src/app/core/models/visualization-layer.model';
import { getSanitizedAnalytics } from 'src/app/analytics/helpers';
import { getStandardizedAnalyticsObject } from 'src/app/analytics/helpers/get-standardized-analytics.helper';

@Injectable()
export class AnalyticsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private analyticsService: AnalyticsService
  ) {}

  @Effect()
  laodAnalytics$: Observable<any> = this.actions$.pipe(
    ofType(AnalyticsActionTypes.LoadAnalytics),
    mergeMap((action: LoadAnalyticsAction) =>
      forkJoin(
        action.visualizationLayers.map(
          (visualizationLayer: VisualizationLayer) => {
            return this.analyticsService.getAnalytics(
              visualizationLayer.dataSelections,
              visualizationLayer.layerType || 'thematic',
              visualizationLayer.config
            );
          }
        )
      ).pipe(
        map((analyticsResults: any[]) => {
          return new LoadAnalyticsSuccessAction(
            analyticsResults.map((analytics: any, analyticsIndex: number) => {
              const visualizationLayer = (action.visualizationLayers || [])[
                analyticsIndex
              ];
              return visualizationLayer
                ? {
                    ...visualizationLayer,
                    analytics: getSanitizedAnalytics(
                      getStandardizedAnalyticsObject(analytics, true),
                      visualizationLayer.dataSelections
                    )
                  }
                : null;
            }),
            action.dashboardItemId
          );
        }),
        catchError(error =>
          of(new LoadAnalyticsFailAction(error, action.dashboardItemId))
        )
      )
    )
  );
}
