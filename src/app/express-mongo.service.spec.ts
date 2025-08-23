import { TestBed } from '@angular/core/testing';

import { ExpressMongoService } from './express-mongo.service';

describe('ExpressMongoService', () => {
  let service: ExpressMongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressMongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
