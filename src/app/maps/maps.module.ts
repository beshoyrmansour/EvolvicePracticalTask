import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapsComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7-dOVXDKQkHx2Tl3jWrFHsMjshjemY_E'
    }),
  ]
})
export class MapsModule { }
