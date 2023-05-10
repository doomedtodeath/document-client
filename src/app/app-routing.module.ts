import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {
    path: 'view',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pdfviewer/pdfviewer.module').then(m => m.PdfviewerModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
