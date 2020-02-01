import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './Services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
 public title = 'blog-angular';
 public identity;
 public token;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
      this.loadUser();
  }

  ngOnInit() {
    console.log('Webapp cargada correctamente :) ');
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
  }

}
