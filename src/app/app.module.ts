import { SharedModule } from './shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@fake-db/fake-db.service';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from '@ctrl/ngx-rightclick';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';

import { coreConfig } from 'app/app-config';
import { fakeBackendProvider } from 'app/auth/helpers'; // used to create fake backend
import { AppComponent } from 'app/app.component';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HttpInterceptorInterceptor } from './shared/HttpInterceptor/http-interceptor.interceptor';


const appRoutes: Routes = [];

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
    // ! IMPORTANT: Provider used to create fake backend, comment while using real API
    // fakeBackendProvider
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorInterceptor,
        multi: true
      }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        RouterModule.forRoot(appRoutes, {
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy'
        }),
        NgbModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        ContextMenuModule,
        CoreModule.forRoot(coreConfig),
        CoreCommonModule,
        CoreSidebarModule,
        CardSnippetModule,
        LayoutModule,
        ContentHeaderModule,
        BlockUIModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        HttpClientModule
      
    ]
})
export class AppModule {}
