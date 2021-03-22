import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AssetService } from './asset.service'

describe('AssetService', () => {
  let service: AssetService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AssetService]
    })
    service = TestBed.inject(AssetService)
  })

  it('return all assets', (done) => {
    service.getAll().subscribe((res) => {
      expect(res).toBeTruthy()
      done()
    }, fail)
  })
})
