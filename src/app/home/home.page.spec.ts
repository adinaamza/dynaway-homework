import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { IonicModule } from '@ionic/angular'
import { AssetCardComponent } from './asset-card/asset-card.component'

import { HomePage } from './home.page'
import { Component } from '@angular/core'
import { mockAssets } from '../shared/services/asset.test'

@Component({
  template: ` <app-home></app-home>`,
})
class TestHostComponent {
  assets = mockAssets
  loaded = true
}
describe('HomePage', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage, AssetCardComponent, TestHostComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have an assets list', async () => {
    // fixture.detectChanges()
    expect(component.assets).toBeTruthy
    console.log(component.assets)

  })
})
