import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BaseComponent } from './base/base.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [ BaseComponent,
    TopNavComponent
  ],
  exports: [BaseComponent],
  })

export class CoreModule {

}
