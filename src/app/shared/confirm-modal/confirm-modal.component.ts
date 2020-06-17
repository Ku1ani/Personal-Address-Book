import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../contacts/models/contact';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() titleText = '';
  @Input() mainText = '';
  @Input() showAction = false;
  @Input() model: Contact;

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteContact() {
    this.modal.close({ command: 'deleteContact', data: this.model });
  }

  editContact() {
      this.modal.close({ command: 'editContact', data: this.model });
  }

  confirm() {
    this.modal.close(true);
  }

  close() {
    this.modal.dismiss();
  }
}
