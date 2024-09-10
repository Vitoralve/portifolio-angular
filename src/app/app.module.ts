import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { HomeComponent } from './pages/home/home.component';
import { FaceFollowerComponent } from './shared/components/face-follower/face-follower.component';
import { FaceFollowerThreeComponent } from './shared/components/face-follower-three/face-follower-three.component';
import { MorphAnimationComponent } from './shared/components/morb-animation/morb-animation.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FaceFollowerComponent,
    FaceFollowerThreeComponent,
    ThemeToggleComponent,
    MorphAnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
