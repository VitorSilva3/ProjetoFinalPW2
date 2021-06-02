import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOrFourComponent } from './components/four-or-four/four-or-four.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Home", component: HomeComponent},
  {path: "404", component: FourOrFourComponent},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
