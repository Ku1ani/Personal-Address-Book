import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
// const routes: Routes = [
//   {
//     path: 'contact',
//     loadChildren: () => import('./contacts/contact.module').then((m) => m.ContactModule)
//   },
// ];

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contacts/create', component: ContactAddComponent },
  { path: 'contacts/edit/:id', component: ContactAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [ContactListComponent, ContactAddComponent];
