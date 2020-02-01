import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public page_title: string;
  constructor() {
    this.page_title = 'Inicio';
  }

  ngOnInit() {
  }

}
