import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './Services/user.service';
import { global } from './Services/global';
import { CategoryService } from './Services/category.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
 public title = 'blog-angular';
 public identity;
 public token;
 public url;
 public categories;

  constructor(
    // tslint:disable-next-line: variable-name
    private _userService: UserService,
    // tslint:disable-next-line: variable-name
    private _categoryService: CategoryService

  ) {
      this.loadUser();
      this.url = global.url;
  }

  ngOnInit() {
    console.log('Webapp cargada correctamente :) ');
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
