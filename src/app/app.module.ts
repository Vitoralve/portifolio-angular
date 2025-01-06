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
import { MorphAnimationComponent } from './shared/components/morph-animation/morph-animation.component';
import { MorphButtonsComponent } from './pages/morph-botoes/morph-botoes.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsComponent } from './pages/page-projects/page-projects.component';

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
    MorphButtonsComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
