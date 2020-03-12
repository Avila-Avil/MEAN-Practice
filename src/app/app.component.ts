import { Component } from '@angular/core';
import { PostModel} from './post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //video 12the-sect1
  // title = 'myapp';
  storedposts: PostModel[] = [];
  onPostAdded(post){
this.storedposts.push(post);
  }
}
