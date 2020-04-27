import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterService } from './services/converter.service';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import zh from '@angular/common/locales/zh';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HomeComponent } from './pages/home/home.component';

registerLocaleData(zh);
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzSwitchModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSliderModule,
    NzGridModule,
    CodemirrorModule
    // NgbModule
  ],
  providers: [ConverterService, { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
