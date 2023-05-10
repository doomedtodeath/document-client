import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfviewerComponent } from './pdfviewer.component';


const routes: Routes = [
  {
    path: '',
    component: PdfviewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfviewerRoutingModule { }
