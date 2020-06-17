import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../contacts/models/contact';

@Component({
  selector: 'app-contact-import-modal',
  templateUrl: './contact-import-modal.component.html',
  styleUrls: ['./contact-import-modal.component.scss']
})
export class ContactImportModalComponent implements OnInit {
  @Input() titleText = '';
  @Input() model: Array<Contact>;
  displayedColumns: {};

  contactList = [];
  length: number;
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {

    if (this.model) {
      this.contactList = this.paginate(this.model, this.pageSize, this.pageIndex);
      console.log('importContacts', this.contactList);

      this.length = this.model.length;
      this.initTableColumns();
    }
  }

  initTableColumns() {
    this.displayedColumns = ['FirstName', 'Surname', 'Telephone Number', 'CellPhone Number', 'Email Address', 'Updated Date'];
  }

  confirm() {
    this.modal.close(this.contactList);
  }

  close() {
    this.modal.dismiss();
  }

  paginate(array: any, pageSize: any, pageNumber: any) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  pageEvent(event: any) {
    let page = 1;
    if (event.pageIndex === 0) {
      page = 1;
    } else {
      page += event.pageIndex;
    }
    this.length = event.length;
    this.pageIndex = page;
    this.pageSize = event.pageSize;

    this.ngOnInit();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
