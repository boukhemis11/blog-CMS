import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminComponent } from './admin/admin.component';
import { BlogpostCreateComponent } from './blogpost-create/blogpost-create.component';

const routes: Routes = [
  { path: 'blogposts', component: BlogpostListComponent },
  { path: 'blogpost/:id', component: BlogpostComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'blogpost-create', component: BlogpostCreateComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
