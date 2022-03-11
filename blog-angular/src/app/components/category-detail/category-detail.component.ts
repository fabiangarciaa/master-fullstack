import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../Services/category.service';
import { global } from '../../Services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService]
})
export class CategoryDetailComponent implements OnInit {

    // tslint:disable-next-line: variable-name
    public page_title;
    public category: Category;
    public posts: any;
    public url: string;
    public status: string;
  constructor(
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _categoryService: CategoryService
  ) {
    this.url = global.url;
   }

  ngOnInit() {
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    this._route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = +params[ 'id' ];

      this._categoryService.getCategory(id).subscribe(
        response => {
          if ( response.status === 'success') {
            this.category = response.category;

            this._categoryService.getPosts(id).subscribe(
              // tslint:disable-next-line: no-shadowed-variable
              response => {
                if (response.status === 'success') {
                this.posts = response.posts;
                } else {
                  this._router.navigate(['/inicio']);
                }
              },
              error => {
              console.log(error);
              }
            );
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
