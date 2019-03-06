import { TestBed } from '@angular/core/testing';

import { DashboardPreferencesService } from './dashboard-preferences.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardPreferencesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: DashboardPreferencesService = TestBed.get(
      DashboardPreferencesService
    );
    expect(service).toBeTruthy();
  });
});
