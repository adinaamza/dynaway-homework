import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Asset } from '../models/asset.model'
import { mockAssetHttpResponse } from './asset.test'
import { delay, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { getRandomInt } from '../functions'

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Asset[]> {
    // return this.http.get<Asset[]>('api/assets').pipe( 
    // is the clean solution when we do API calls, but I did not manage to fake a 
    // url to call :D

    // this is the fix when we know we want only the data from the response
    // to process in an observable
    return of(mockAssetHttpResponse.data).pipe(
      delay(getRandomInt(1000) + 500), // fake random http delay,
      tap(() => { // a small chance for the data fetch to error
        if (getRandomInt(10) % 10 === 0) throw Error('Http error')
      }),
    )
  }
}

