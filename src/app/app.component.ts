import {Component, OnInit, ViewChild} from '@angular/core';
import {render} from "./engine/main";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'labs-angular-jump-and-run-game';
  constructor() {
  }

  ngOnInit(): void {
    render();
  }
}
