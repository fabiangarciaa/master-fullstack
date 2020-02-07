import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;

  constructor(
    // tslint:disable-next-line: variable-name
    private _postService: PostService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) { }

  ngOnInit() {
    this.getPost();
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
              console.log(this.post);
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

}
