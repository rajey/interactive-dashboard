import { Favorite } from 'src/app/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  FavoriteActionTypes,
  FavoriteActions
} from '../actions/favorite.actions';

export interface State extends EntityState<Favorite> {}

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

const initialState: State = adapter.getInitialState({});

export function reducer(
  state: State = initialState,
  action: FavoriteActions
): State {
  switch (action.type) {
    case FavoriteActionTypes.AddFavorites:
      return adapter.addAll(action.favorites, state);

    case FavoriteActionTypes.UpdateFavorite:
      return adapter.updateOne(
        { id: action.id, changes: action.changes },
        state
      );
    case FavoriteActionTypes.AddFavorite: {
      return adapter.addOne(action.favorite, state);
    }

    case FavoriteActionTypes.LoadFavoriteFail: {
      return state;
    }

    default:
      return state;
  }
}
