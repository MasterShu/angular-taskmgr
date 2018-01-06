import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from '../utils/svg.utils';
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import '../utils/debug.util';
import { AppStoreModule } from '../reducers/index';
import { AppEffectsModule } from '../effects/index';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppStoreModule,
    AppEffectsModule,
    ServicesModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    SharedModule,
    AppStoreModule,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MatIconRegistry, ds: DomSanitizer) {
    if (parent) {
      throw new Error('模块已存在, 不能再次加载');
    }
    loadSvgResources(ir, ds);
  }
}
