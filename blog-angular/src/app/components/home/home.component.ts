import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../Services/post.service';
import { global } from '../../Services/global';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public page_title: string;
  public url;
  public posts: Array<Post>;
  public status;
  public identity;
  public token;


  constructor(
    // tslint:disable-next-line: variable-name
    private _postService: PostService,
    // tslint:disable-next-line: variable-name
    private _userService: UserService
  ) {
    this.page_title = 'Inicio';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status === 'success') {
          this.posts = response.categories;
          console.log(this.posts);
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(error);
      }
    );
  }

}
