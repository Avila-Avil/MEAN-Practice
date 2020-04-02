import { Component,  OnInit, OnDestroy } from '@angular/core';
import { PostModel} from '../post.model';
import { PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

 posts:PostModel[] =[];
  private postSub: Subscription;

  constructor(
    public postservicehandle: PostsService
      ){}

    ngOnInit(){
      this.postservicehandle.getPosts();
       this.postSub = this.postservicehandle.getPostUpdateListener()
      .subscribe((posts:PostModel[])=>{
        this.posts = posts;

      })
    }

    onDelete(postId: string) {
      this.postservicehandle.deletePost(postId);
    }
    ngOnDestroy(){
      this.postSub.unsubscribe();
    }
}
