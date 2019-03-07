import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { HttpClientModule } from '@angular/common/http';

describe('FavoriteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: FavoriteService = TestBed.get(FavoriteService);
    expect(service).toBeTruthy();
  });
});
