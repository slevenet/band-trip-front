import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreationComponent} from "./event-trip/creation/creation.component";

const routes: Routes = [
  {path: 'test',  component: CreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
