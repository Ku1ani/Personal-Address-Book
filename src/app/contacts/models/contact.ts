import {Serializable} from '../../shared/interface/serializable';

export class Contact implements Serializable {

    Id: number;
    FirstName: string;
    Surname: string;
    Tel: string;
    Cell: string;
    Email: string;
    UpdatedDate: Date;

    constructor(Id: number = 0,
                FirstName: string = '',
                Surname: string = '',
                Tel: string = '',
                Cell: string = '',
                Email: string = '',
                UpdatedDate: Date = null) {
        this.Id = Id;
        this.FirstName = FirstName;
        this.Surname = Surname;
        this.Tel = Tel;
        this.Cell = Cell;
        this.Email = Email;
        this.UpdatedDate = UpdatedDate;
    }

    toJSON() {
      return {
          Id: this.Id,
          FirstName: this.FirstName,
          Surname: this.Surname,
          Tel: this.Tel,
          Cell: this.Cell,
          Email: this.Email,
          UpdatedDate: this.UpdatedDate,
      }
    }

    fromJSON(obj: any) {
        this.Id = obj.id;
        this.FirstName = obj.firstName;
        this.Surname = obj.surname;
        this.Tel = obj.tel;
        this.Cell = obj.cell;
        this.Email = obj.email;
        this.UpdatedDate = obj.updatedDate;
    }

    get Initials() {
      let initials = '';

      if ((this.FirstName && this.FirstName.length > 1) &&
          (this.Surname && this.Surname.length)) {
            initials = this.FirstName.substring(0, 1).toUpperCase() + this.Surname.substring(0, 1).toUpperCase();
      }
      return initials;
    }

}
