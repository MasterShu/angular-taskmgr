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

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [
    HeaderComponent, FooterComponent, SidebarComponent
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
