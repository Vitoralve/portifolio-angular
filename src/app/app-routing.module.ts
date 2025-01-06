import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { MorphButtonsComponent } from './pages/morph-botoes/morph-botoes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'morph', component: MorphButtonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
