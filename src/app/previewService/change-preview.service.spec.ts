import { TestBed } from '@angular/core/testing';

import { ChangePreviewService } from './change-preview.service';

describe('ChangePreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangePreviewService = TestBed.get(ChangePreviewService);
    expect(service).toBeTruthy();
  });
});
