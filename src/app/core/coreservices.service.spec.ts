import { TestBed } from '@angular/core/testing';

import { CoreservicesService } from './coreservices.service';

describe('CoreservicesService', () => {
  let service: CoreservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
