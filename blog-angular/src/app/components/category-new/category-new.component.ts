import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  public page_title;
  public identity;
  public token;
  public category: Category;
  public status: string;

  constructor(
    // tslint:disable-next-line: variable-name
    private _userService: UserService,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Crear nueva categoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          this.category = response.category;
          this.status = 'success';

          this._router.navigate(['/inicio']);

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
