import { Component, OnInit } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private accessService: AccessService) { 
    // document.body.style.background = 'rgba(0, 0, 0, .6)';
  }

  ngOnInit() {
  }

}
