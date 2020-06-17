import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NgbModalOptions, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ContactImportModalComponent } from '../contact-import-modal/contact-import-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../services/api.service';
import { Contact } from '../models/contact';
import * as moment from 'moment';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();

  inputForm: FormGroup = new FormGroup({});
  searchSub: Subscription;
  dateSub: Subscription;

  contacts = Array<Contact>();
  contactsImport = Array<any>();
  displayedColumns: {};

  heading: string;
  headingIcon: string;
  loading: boolean;

  pageSizes: number[];
  currentPageSize: number;
  currentPage: number;
  totalPages: number;
  sort: any;
  search: any;
  date: Date;
  maxDate: any;
  filter: any = {};

  text: any ;
  jSonData: any;

  selection = new SelectionModel<Contact>(true, []);

  constructor(private router: Router, private modalService: NgbModal, private api: ApiService, private snackBar: MatSnackBar) {
    this.heading = 'Contact List';
    this.headingIcon = 'contact_phone';

    this.currentPage = 1;
    this.currentPageSize = 10;
    this.pageSizes = [10, 50, 100];
    this.sort = null;
    this.search = null;
    this.maxDate = moment();
    this.loading = false;
  }

  ngOnInit(): void {
    this.date = new Date();
    this.initForm();
    this.initData();
    this.initTableColumns();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  destroySubscriptions() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }

    if (this.dateSub) {
      this.dateSub.unsubscribe();
    }
  }

  initTableColumns() {
    this.displayedColumns = ['checked', 'FirstName', 'Surname', 'Telephone Number', 'CellPhone Number', 'Email Address', 'Updated Date'];
  }

  initSubscriptions() {
    this.destroySubscriptions();

    this.searchSub = this.inputForm.controls.searchCriteria.valueChanges
        .pipe(debounceTime(500), takeUntil(this.unsubscribe))
        .subscribe((search) => {
          if (search) {
            this.search = search;
            this.initData();
          } else {
            this.search = null;
            this.initData();
          }
      });

    this.dateSub = this.inputForm.controls.dateRange.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe))
      .subscribe((range) => {
        if (range) {
          const dateFrom = moment(range.begin).format('YYYY-MM-DD HH:mm:ss');
          const dateTo = moment(range.end).format('YYYY-MM-DD HH:mm:ss');

          this.filter = { StartDate: dateFrom, EndDate: dateTo };
          this.initData();
        } else {
          this.filter = null;
          this.initData();
        }
    });
  }

  initData() {
    this.loading = true;
    this.api.getAll('/Contacts/', this.currentPage, this.currentPageSize, this.sort, true, this.search, this.filter, []).pipe(
      takeUntil(this.unsubscribe)).subscribe(data => {

      this.contacts = data.body;
      this.loading = false;
    });
  }

  initForm() {
    const form = {};

    const dateValidators = [];
    const dateInput = new FormControl(
        {
            value: '',
            disabled: false,
        },
        dateValidators,
    );
    form['dateRange'] = dateInput;

    const searchValidators = [];
    const searchInput = new FormControl(
        {
            value: '',
            disabled: false,
        },
        searchValidators,
    );
    form['searchCriteria'] = searchInput;

    this.buildForm(form);
  }

  buildForm(form: any) {
    this.inputForm = new FormGroup(form);
    this.initSubscriptions();
  }

  addContact() {
    this.router.navigate(['/contacts/create']);
  }

  actionNavigation(contact: any) {
    const options: NgbModalOptions = {
      size: 'sm',
    };
    const modalRef = this.modalService.open(ConfirmModalComponent, options);
    modalRef.componentInstance.showAction = true;
    modalRef.componentInstance.model = contact;
    const self = this;
    modalRef.result.then(complete => self.handleModalEvent(complete), cancel => {
      this.initData();
    });
  }

  handleModalEvent(closed: any) {
    if (!closed) {
        return;
    }
    if (closed.command === 'deleteContact') {
        this.deleteContactConfirm(closed.data);
    } else if (closed.command === 'editContact') {
        this.editContact(closed.data);
    }
  }

  deleteContactConfirm(contact: any) {
    const options: NgbModalOptions = {
      size: 'sm',
    };
    const modalRef = this.modalService.open(ConfirmModalComponent, options);

    modalRef.componentInstance.titleText = 'Confirmation Delete?';
    modalRef.componentInstance.mainText = 'Are you sure you want to delete contact?';
    modalRef.result.then(
      (result) => {
         this.deleteContact(contact);
      },
      (closed) => {
        // do nothing
        this.initData();
      },
    );
  }

  deleteContact(contact: any) {
    if (contact && contact.id > 0 ) {
      this.loading = true;
      this.api.delete(contact.id).subscribe(data => {
        this.loading = false;
        const message = 'Contact deleted successfully';
        this.successSave(message);
        this.initData();
     });
    }
  }

  editContact(contact: any) {
    this.router.navigate(['/contacts/edit/' + contact.id]);
  }

  pageEvent(event: any) {
    let page = 1;
    if (event.pageIndex === 0) {
      page = 1;
    } else {
      page += event.pageIndex;
    }

    this.currentPage = page;
    this.currentPageSize = event.pageSize;

    this.initData();
  }

  sortData(event: any) {
    this.sort = { prop: event.active, dir: event.direction };
    this.initData();
  }

  importContacts(contactsImport: any) {
    if (contactsImport) {
      const options: NgbModalOptions = {
        size: 'lg',
      };
      const modalRef = this.modalService.open(ContactImportModalComponent, options);
      modalRef.componentInstance.titleText = 'Import contacts';
      modalRef.componentInstance.model = contactsImport;
      const self = this;
      modalRef.result.then(complete => self.saveImportedContacts(complete), cancel => {
        this.initData();
      });
    }

  }

  saveImportedContacts(contacts: any) {
    if (contacts && contacts.length > 0) {
      for (let i = 0; i <= contacts.length; i++) {
        if (contacts[i]) {
          this.api.create(contacts[i]).subscribe(data => {
            if (data) {
              const message = 'Contacts imported successfully';
              this.successSave(message);
            }
          });
        }
      }

      this.initData();
    }
  }

  csvJSON(csvText: any) {
    const lines = csvText.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length - 1; i++) {

        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    if (result) {
      this.importContacts(result);
    }
    return this.jSonData = result;
  }

  convertFile(input) {
    const reader = new FileReader();
    reader.readAsText(input.target.files[0]);
    reader.onload = () => {
      const text = reader.result;
      this.csvJSON(text);
    };
  }

  successSave(message: string) {
    this.snackBar.open(message, null, {
      duration: 5000,
    });
  }

}
