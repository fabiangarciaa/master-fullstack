import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../Services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    // tslint:disable-next-line: variable-name
    private _userService: UserService,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute
    ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    // Se ejecuta siempre que yo cargue este componente y cierra sesion solo cuando le llega el parametro Sure por la URL
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        // TOKEN
        // tslint:disable-next-line: triple-equals
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          // OBJETO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            response => {
             this.identity = response;
             console.log(this.token);
             console.log(this.identity);

             // PERSISTIR DATOS USUARIO IDENTIFICADO
             localStorage.setItem('token', this.token);
             localStorage.setItem('identity', JSON.stringify(this.identity));

             // REDIRECCION A INICIO
             this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
              // tslint:disable-next-line: no-angle-bracket-type-assertion
              console.log(<any> error);
            }
          );


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

  logout() {
    this._route.params.subscribe( params => {
    // tslint:disable-next-line: no-string-literal
    const logout = +params['sure'];

    // tslint:disable-next-line: triple-equals
    if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // REDIRECCION A INICIO
        this._router.navigate(['inicio']);
    }
    } );
  }

}
