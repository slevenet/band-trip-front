import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreationComponent} from "./event-trip/creation/creation.component";
import {IndexPageComponent} from "./index-page/index-page.component";

const routes: Routes = [
  {path: 'test', component: CreationComponent},
  {path: '', component: IndexPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
