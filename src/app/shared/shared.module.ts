import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ContactImportModalComponent } from '../contacts/contact-import-modal/contact-import-modal.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ConfirmModalComponent, ContactImportModalComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    ScrollingModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    // NgxDatatableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    ScrollingModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  entryComponents: [
    ConfirmModalComponent, ContactImportModalComponent
  ],
  providers: [
    ApiService, MatDatepickerModule, MatNativeDateModule, SatDatepickerModule, SatNativeDateModule
  ]
})
export class SharedModule { }
