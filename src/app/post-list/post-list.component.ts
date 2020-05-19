import { Component,  OnInit, OnDestroy } from '@angular/core';
import { PostModel} from '../models/post.model';
import { PostsService} from '../services/posts.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

 posts:PostModel[] =[];
 isLoading = false;
 totalpages= 0;
 postperpage=2;
 currentpage =1;
 pagesizeoptions=[1,2,5,10]
  private postSub: Subscription;

  constructor(
    public postservicehandle: PostsService
      ){}

    ngOnInit(){
      this.isLoading = true;
      this.postservicehandle.getPosts(this.postperpage, this.currentpage);
       this.postSub = this.postservicehandle.getPostUpdateListener()
      .subscribe((postData: {posts:PostModel[], postcount: number})=>{
        this.isLoading = false;
        this.totalpages = postData.postcount,
        this.posts = postData.posts;
      });
    }

    onChangedPage(pageData: PageEvent){
      this.isLoading = true;
      this.currentpage = pageData.pageIndex+1;
      this.postperpage = pageData.pageSize;
      this.postservicehandle.getPosts(this.postperpage, 1);
      console.log(pageData);
    }
    onDelete(postId: string) {
      this.isLoading = true;
      this.postservicehandle.deletePost(postId)
      .subscribe(() =>{
        this.postservicehandle.getPosts(this.postperpage, this.currentpage);
      });
    }
    ngOnDestroy(){
      this.postSub.unsubscribe();
    }
}
