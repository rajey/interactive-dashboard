import { Action } from '@ngrx/store';
import { ErrorMessage, Favorite } from 'src/app/core';

export enum FavoriteActionTypes {
  AddFavorites = '[Favorite] Add favorites',
  LoadFavorite = '[Favorite] Load favorite',
  LoadFavoriteFail = '[Favorite] Load favorite fail',
  UpdateFavorite = '[Favorite] Add or Update favorite',
  AddFavorite = '[Favorite] Add favorite',
  RemoveFavorite = '[Favorite] Remove favorite'
}

export class LoadFavoriteAction implements Action {
  readonly type = FavoriteActionTypes.LoadFavorite;
  constructor(public favoriteId: string, public favoriteType: string) {}
}

export class AddFavoritesAction implements Action {
  readonly type = FavoriteActionTypes.AddFavorites;
  constructor(public favorites: Favorite[]) {}
}

export class AddFavoriteAction implements Action {
  readonly type = FavoriteActionTypes.AddFavorite;
  constructor(public favorite: Favorite) {}
}

export class LoadFavoriteFailAction implements Action {
  readonly type = FavoriteActionTypes.LoadFavoriteFail;
  constructor(public error: ErrorMessage, public favoriteId: string) {}
}

export class RemoveFavoriteAction implements Action {
  readonly type = FavoriteActionTypes.RemoveFavorite;
  constructor(public favoriteId: string) {}
}

export class UpdateFavoriteAction implements Action {
  readonly type = FavoriteActionTypes.UpdateFavorite;
  constructor(public id: string, public changes: Partial<Favorite>) {}
}

export type FavoriteActions =
  | AddFavoritesAction
  | AddFavoriteAction
  | RemoveFavoriteAction
  | UpdateFavoriteAction
  | LoadFavoriteAction
  | LoadFavoriteFailAction;
