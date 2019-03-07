import { TestBed } from '@angular/core/testing';

import { DashboardItemService } from './dashboard-item.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardItemService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: DashboardItemService = TestBed.get(DashboardItemService);
    expect(service).toBeTruthy();
  });
});
