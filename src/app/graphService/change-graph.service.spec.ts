import { TestBed } from '@angular/core/testing';

import { ChangeGraphService } from './change-graph.service';

describe('ChangeGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeGraphService = TestBed.get(ChangeGraphService);
    expect(service).toBeTruthy();
  });
});
