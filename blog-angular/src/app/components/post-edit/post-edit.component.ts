import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CategoryService } from '../../Services/category.service';
import { Post } from '../../models/post';
import { global } from '../../Services/global';
import { PostService } from '../../Services/post.service';


@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  // tslint:disable-next-line: variable-name
  public is_edit: boolean;

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
    maxSize: '50',
    uploadAPI:  {
      url: global.url + 'post/upload',
      headers: {
     // tslint:disable-next-line: object-literal-key-quotes
     'Authorization' : this._userService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Imagen del Post',
    replaceTexts: {
      attachPinBtn: 'Sube tu imagen para el post',
    }
  };

  constructor(
    // tslint:disable-next-line: variable-name
    private _userService: UserService,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _categoryService: CategoryService,
    // tslint:disable-next-line: variable-name
    private _postService: PostService

  ) {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
  }

  ngOnInit() {
    this.getCategories();
    let ID = this.identity.sub;
    if (ID == null) {
      ID = this.identity.id;
    }
    this.post = new Post(1, ID, 1, '', '', null, null);
    this.getPost();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
          // tslint:disable-next-line: triple-equals
          if (response.status == 'success') {
              this.categories = response.categories;
          }
      },
      error => {
              console.log(error);
      }
    );
  }

  getPost() {
    // Sacar el ide del post de la url
    this._route.params.subscribe(params => {
      const id = +params.id;

      // Peticion Ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
            if (response.status === 'success') {
              this.post = response.post;
            } else {
              this._router.navigate(['/inicio']);
            }
        },
        error => {
            console.log(error);
            this._router.navigate(['/inicio']);
        }
      );
    });
  }

  imageUpload(data) {
    // tslint:disable-next-line: variable-name
    const image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
   }

   onSubmit(form) {
     this._postService.update(this.token, this.post, this.post.id).subscribe(
       response => {
          if (response.status === 'success') {
            this.post = response.post;
            this.status = 'success';
            this._router.navigate(['/entrada', this.post.id]);
          } else {
            this.status = 'error';
          }
       },
       error => {
            console.log(error);
            this.status = 'error';
       }
     );
   }

}
