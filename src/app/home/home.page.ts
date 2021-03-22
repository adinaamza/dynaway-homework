import { Component, OnInit } from '@angular/core'
import { Asset } from '../shared/models/asset.model'
import { AssetService } from '../shared/services/asset.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: Asset[] = []
  emptyList = [undefined, undefined, undefined]  
  loaded: boolean = false

  constructor(private assetService: AssetService) {}

  ionViewWillEnter(): void {
    this.assets = []
    this.assetService.getAll().subscribe(assets => {
      this.assets = assets
      this.loaded = true
    })
  }
}
