import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ContactRoutingModule } from './contact.routing';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactImportModalComponent } from './contact-import-modal/contact-import-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  declarations: [
    ContactListComponent,
    ContactAddComponent,
    ContactImportModalComponent,
  ],
})

export class ContactModule { }
