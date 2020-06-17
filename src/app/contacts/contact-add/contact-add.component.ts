import { Component, OnInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { from, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { flatMap, map, startWith, takeUntil } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Contact } from '../models/contact';
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  inputForm: FormGroup = new FormGroup({});

  loading: boolean;
  pixel: boolean;
  contact: Contact;
  contactId: number;

  heading: string;
  headingIcon: string;

  ONLY_LETTERS_REGEX = /^[a-z ,.'-]+$/i;
  PHONE_REGEX = /^[\d\s()]+$/;
  EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private snackBar: MatSnackBar) {
    this.pixel = true;
  }

  ngOnInit(): void {
    if (!this.contact) {
      this.contact = new Contact();
    }

    this.route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      this.loading = true;
      const id = parseInt(params.get('id'), 10);

      this.contactId = id;
      if (this.contactId && this.contactId > 0) {
        this.initComponent();
      }
      this.initForm();
    });


  }

  initComponent() {
    this.api.getById(this.contactId).pipe(takeUntil(this.unsubscribe))
    .subscribe((data) => {
      const contactObj = new Contact();
      contactObj.fromJSON(data);

      this.contact = contactObj;
      this.initForm();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initForm() {
    const form: any = {};

    const firstNameValidators = [Validators.required, Validators.maxLength(20), Validators.pattern(this.ONLY_LETTERS_REGEX)];
    const firstNameInput = new FormControl({
            value: this.contact.FirstName,
            disabled: false
        }, firstNameValidators);
    form.FirstName = firstNameInput;

    const surnameValidators = [Validators.required, Validators.maxLength(20), Validators.pattern(this.ONLY_LETTERS_REGEX)];
    const surnameInput = new FormControl({
            value: this.contact.Surname,
            disabled: false
        }, surnameValidators);
    form.Surname = surnameInput;

    const cellValidators = [
      Validators.pattern(this.PHONE_REGEX),
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10)];
    const cellInput = new FormControl({
          value: this.contact.Cell,
          disabled: false
    }, cellValidators);
    form.Cell = cellInput;

    const telePhoneNumberValidators = [
      Validators.pattern(this.PHONE_REGEX),
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10)];
    const telePhoneNumberInput = new FormControl({
          value: this.contact.Tel,
          disabled: false
      }, telePhoneNumberValidators);
    form.Tel = telePhoneNumberInput;

    const emailValidators = [Validators.required, Validators.pattern(this.EMAIL_REGEX), Validators.maxLength(50)];
    const emailInput = new FormControl({
                value: this.contact.Email,
                disabled: false
            }, emailValidators,
        );
    form.Email = emailInput;

    this.buildForm(form);
  }

  buildForm(form: any) {
    this.inputForm = new FormGroup(form);
  }

  markAsTouched(group: FormGroup | FormArray) {
    group.markAsTouched();
    for (const i in group.controls) {
        if (group.controls[i] instanceof FormControl) {
            group.controls[i].markAsTouched();
        } else {
            this.markAsTouched(group.controls[i]);
        }
    }
}

  updateContact() {
    const updatedModel = this.inputForm.value;
    const keys = Object.keys(updatedModel);
    for (let x = 0; x < keys.length; x++) {
        this.contact[keys[x]] = updatedModel[keys[x]];
    }
  }

  submit() {
    this.markAsTouched(this.inputForm);
    if (this.inputForm.valid) {
      this.updateContact();
      this.loading = true;
      this.contact.UpdatedDate = new Date();

      if (this.contact && this.contact.Id === 0) {
        this.api.create(this.contact).subscribe(data1 => {
          const message = this.contact.FirstName + ' saved successfully';
          this.successSave(message);
          this.router.navigate([''], {relativeTo: this.route});
        });
      } else {
        this.api.update(this.contact.Id, this.contact).subscribe(data => {
          const message = this.contact.FirstName + ' updated successfully';
          this.successSave(message);
          this.initForm();
        });
      }
    }
  }

  cancel() {
    this.router.navigate([''], {relativeTo: this.route});
  }

  successSave(message: string) {
    this.snackBar.open(message, null, {
      duration: 5000,
    });
  }

}
