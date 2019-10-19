import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 
    document.body.style.background = 'rgba(0, 0, 0, .6)';
  }

  ngOnInit() {
  }

}
