import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../Services/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  public page_title: string;
  public user: User;
  public status: string;


  constructor(
    // tslint:disable-next-line: variable-name
    private _userService: UserService

  ) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');

  }

  ngOnInit() {
    console.log('Componente de registro lanzado!');
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        // tslint:disable-next-line: triple-equals
        if ( response.status == 'Success') {

            this.status = response.status;
            form.reset();


        } else {
          this.status = 'error';
        }

      },
      error => {
        this.status = 'error';
        console.log(error as any);
      }
    );

  }

}
