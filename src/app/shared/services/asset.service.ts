import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Asset } from '../models/asset.model'
import { mockAssetHttpResponse } from './asset.test'
import { delay, tap, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { getRandomInt } from '../functions'
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  constructor(private http: HttpClient,
    private alertController: AlertController) {
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
      catchError(this.handleError<Asset[]>())
    )
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.presentAlert();
      return of(result as T);
    };
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Something went wrong.',
      message: 'Please reload and try again.',
      buttons: [{
        text: 'Reload',
        role: 'cancel',
        handler: () => {
          //should find a more elegant solution to reload the component itself
          //not the entire page
          window.location.reload()
        }
      }]
    });

    await alert.present();
  }
}

