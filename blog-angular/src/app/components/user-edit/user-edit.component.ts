import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../Services/user.service';
import { global } from '../../Services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;
  // tslint:disable-next-line: variable-name // tslint:disable-next-line: ban-types
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  public afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg,.png,.jpeg',
      maxSize: '1',
      uploadAPI:  {
        url: global.url + 'user/upload',
        headers: {
       // tslint:disable-next-line: object-literal-key-quotes
       'Authorization' : this._userService.getToken()
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu avatar de usuario',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
      }
    };

  constructor(
    // tslint:disable-next-line: variable-name
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    // Rellenar objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image
              );
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        // tslint:disable-next-line: triple-equals
        if (response && response.status) {
            console.log(response);
            this.status = 'success';
            // Actualizar usuario en sesion
            if (response.changes.name) {
                this.user.name = response.changes.name;
            }
            if (response.changes.surname) {
              this.user.surname = response.changes.surname;
            }
            if (response.changes.email) {
              this.user.email = response.changes.email;
            }
            if (response.changes.description) {
              this.user.description = response.changes.description;
            }
            if (response.changes.image) {
              this.user.image = response.changes.image;
            }
            this.identity = this.user;
            localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        console.log(<any> error);
      }
    );
  }

  avatarUpload(datos) {
   const data = JSON.parse(datos.response);
   this.user.image = data.image;
  }

}
