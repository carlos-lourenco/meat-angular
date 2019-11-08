import {Component, OnInit} from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html',
  viewProviders: [Title]
})
export class AppComponent implements OnInit {

  //content = 'Welcome do Meat App!'

  constructor(title: Title) { 
    title.setTitle( 'IB OCeânica' )
  }

  ngOnInit() {
  }

}
