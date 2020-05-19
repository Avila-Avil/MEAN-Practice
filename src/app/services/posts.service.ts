import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PostModel } from "../models/post.model";


@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<{posts: PostModel[], postcount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postperpage: number,currentpage: number ) {
    const postQuery= `?pagesize=${postperpage}&page=${currentpage}`
    this.http
      .get<{ message: string; posts: any, maxPosts: number }>(
        "http://localhost:3000/api/posts" + postQuery
      )
      .pipe(map((postData) => {
        return {posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }),
          maxPosts: postData.maxPosts
      };
      }))
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({posts:[...this.posts], postcount: transformedPostData.maxPosts});
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string, post: PostModel }>("http://localhost:3000/api/posts", postData)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

getPost(id: string){
  return this.http.get<{_id: string, title: string, content: string, imagePath: string}>
  ("http://localhost:3000/api/posts/" +id);
}


updatePost(id: string, title: string, content: string, image:File | string  ) {
  let postData: PostModel | FormData;
  if(typeof image === 'object'){
    postData = new FormData();
    postData.append("id", id);
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
  }else
  {
      postData = {
        id: id,
         title: title,
          content: content,
          imagePath: image
      }
  }
  this.http
    .put("http://localhost:3000/api/posts/" + id, postData)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
}
  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
  }
}

