import { Component } from '@angular/core';
import { PostModel } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';


@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  //video 12the-sect1
  enteredContent='';
  enteredTitle='';



  constructor(
    public postservicehandle: PostsService
  ){}

  onAddPost(form:NgForm) {
    if (form.invalid){
      return;
    }
    // const post: PostModel = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
   this.postservicehandle.addPosts(form.value.title, form.value.content);
   form.resetForm();
  }
}
