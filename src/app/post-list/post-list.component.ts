import { Component, Input } from '@angular/core';
import { PostModel} from '../post.model';


@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{
// posts =[
//   {title: 'FirstPost', content:'This is my 1st post'},
//   {title: 'SecondPost', content:'This is my 2nd post'},
//   {title: 'ThirdPost', content:'This is my 3rd post'},
// ];
 @Input() posts:PostModel[] =[];
}
