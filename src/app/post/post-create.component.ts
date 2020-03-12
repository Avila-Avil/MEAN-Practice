import { Component, EventEmitter, Output } from '@angular/core';
//video13-sec1
import { PostModel} from '../post.model';
import { NgForm } from '@angular/forms';


@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  //video 12the-sect1
  enteredContent='';
  enteredTitle='';
  @Output() postCreated = new EventEmitter<PostModel>();
  //video 12the-sect1
  // newPost='No Content';

 // onAddPost(postInput: HTMLTextAreaElement){
    //console.log(postInput);
    //console.dir(postInput);
    //this.newPost = 'The User\'s post';
    //this.newPost = postInput.value;
  //video 12the-sect1
    //this.newPost = this.enteredValue;
  //video 12the-sect1
  onAddpost(form: NgForm){
    const post: PostModel = {
      title: form.value.title,
      content:form.value.content};
    this.postCreated.emit(post);
  }

}
