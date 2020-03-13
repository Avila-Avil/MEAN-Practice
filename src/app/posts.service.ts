import {PostModel} from './post.model';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({providedIn:"root"})
export class PostsService{
  private serviceposts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

getPosts() {
  return [... this.serviceposts];
}

getPostsUpdateListener(){
  return this.postsUpdated.asObservable();
}

addPosts(title: string, content: string){
  const post: PostModel ={title: title, content: content };
  this.serviceposts.push(post);
  this.postsUpdated.next([... this.serviceposts]);
}
}
