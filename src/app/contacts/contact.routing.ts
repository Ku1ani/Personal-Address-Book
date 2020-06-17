
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';

const routes: Routes = [
  { path: 'managecontacts', component: ContactListComponent },
  { path: 'managecontacts/create', component: ContactAddComponent },
  { path: 'managecontacts/edit/:id', component: ContactAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContactRoutingModule {
}
export const superUserComponents = [];
