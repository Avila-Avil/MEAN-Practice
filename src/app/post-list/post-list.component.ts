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
      this.posts = this.postservicehandle.getPosts();
       this.postSub = this.postservicehandle.getPostsUpdateListener()
      .subscribe((posts:PostModel[])=>{
        this.posts = posts;

      })
    }

    ngOnDestroy(){
      this.postSub.unsubscribe();
    }
}
